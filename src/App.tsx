import React from 'react';
import NotesList from './components/NotesList';
import NotesForm from './components/NotesForm';
import type { Note } from './types/Note';

type AppState = {
  notes: Note[];
  loading: boolean;
  error: string | null;
  submitting: boolean;
  deletingIds: Record<number, boolean>;
};

export default class App extends React.Component<Record<string, never>, AppState> {
  private readonly API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:7070/notes';

  state: AppState = {
    notes: [],
    loading: false,
    error: null,
    submitting: false,
    deletingIds: {},
  };

  componentDidMount(): void {
    this.loadNotes();
  }

  loadNotes = async (): Promise<void> => {
    this.setState({ loading: true, error: null });

    try {
      const res = await fetch(this.API_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data: Note[] = await res.json();
      this.setState({ notes: data, loading: false });
    } catch (e: unknown) {
      const isProd = import.meta.env.PROD;
      const message =
        isProd
          ? 'Backend недоступен. GitHub Pages хостит только фронтенд — запустите backend локально (http://localhost:7070) или задеплойте его и укажите VITE_API_URL.'
          : (e instanceof Error ? e.message : 'Unknown error');

      this.setState({ error: message, loading: false });
    }
  };

  handleRefresh = (): void => {
    this.loadNotes();
  };

  handleAdd = async (content: string): Promise<void> => {
    const trimmed = content.trim();
    if (!trimmed) return;

    this.setState({ submitting: true, error: null });

    try {
      const res = await fetch(this.API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: 0, content: trimmed }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      await this.loadNotes();
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Unknown error';
      this.setState({ error: message });
    } finally {
      this.setState({ submitting: false });
    }
  };

  handleDelete = async (id: number): Promise<void> => {
    this.setState((prev) => ({
      error: null,
      deletingIds: { ...prev.deletingIds, [id]: true },
    }));

    try {
      const res = await fetch(`${this.API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      await this.loadNotes();
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Unknown error';
      this.setState({ error: message });
    } finally {
      this.setState((prev) => {
        const { [id]: _removed, ...rest } = prev.deletingIds;
        return { deletingIds: rest };
      });
    }
  };

  render(): React.ReactNode {
    const { notes, loading, error, submitting, deletingIds } = this.state;

    return (
      <div className="page">
        <header className="header">
          <h1 className="title">Notes</h1>

          <button
            className="icon-btn refresh"
            type="button"
            aria-label="Обновить"
            title="Обновить"
            onClick={this.handleRefresh}
            disabled={loading}
          >
            ⟲
          </button>
        </header>

        {error && (
          <div className="alert" role="alert">
            Ошибка: {error}
          </div>
        )}

        {loading ? (
          <div className="muted">Загрузка…</div>
        ) : (
          <NotesList notes={notes} onDelete={this.handleDelete} deletingIds={deletingIds} />
        )}

        <section className="new-note">
          <h2 className="subtitle">New Note</h2>
          <NotesForm onAdd={this.handleAdd} submitting={submitting} />
        </section>

        <footer className="footer">
          <div className="muted">
            Backend: <code>http://localhost:7070/notes</code>
          </div>
        </footer>
      </div>
    );
  }
}
import React from 'react';
import type { Note } from '../types/Note';

type NoteCardProps = {
    note: Note;
    onDelete: (id: number) => void;
    deleting: boolean;
};

export default class NoteCard extends React.PureComponent<NoteCardProps> {
    handleDelete = (): void => {
        const { note, onDelete, deleting } = this.props;
        if (deleting) return;
        onDelete(note.id);
    };

    render(): React.ReactNode {
        const { note, deleting } = this.props;

        return (
            <article className="card">
                <button
                    className="icon-btn delete"
                    type="button"
                    aria-label="Удалить"
                    title="Удалить"
                    onClick={this.handleDelete}
                    disabled={deleting}
                >
                    ×
                </button>

                <div className="card-content">{note.content}</div>

                {deleting && <div className="card-status muted">Удаление…</div>}
            </article>
        );
    }
}
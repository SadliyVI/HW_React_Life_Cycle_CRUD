import React from 'react';
import type { Note } from '../types/Note';
import NoteCard from './NoteCard';

type NotesListProps = {
    notes: Note[];
    onDelete: (id: number) => void;
    deletingIds: Record<number, boolean>;
};

export default class NotesList extends React.PureComponent<NotesListProps> {
    render(): React.ReactNode {
        const { notes, onDelete, deletingIds } = this.props;

        if (!notes.length) {
            return <div className="muted">Заметок пока нет — добавьте первую.</div>;
        }

        return (
            <div className="grid">
                {notes.map((note) => (
                    <NoteCard
                        key={note.id}
                        note={note}
                        onDelete={onDelete}
                        deleting={Boolean(deletingIds[note.id])}
                    />
                ))}
            </div>
        );
    }
}
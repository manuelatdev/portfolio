
export interface Note {
    id: number;
    title: string;
    content: string;
    done: boolean;
}

export interface UseNotes {
    notes: Note[];
    handleAddNote: () => void;
    handleRemoveNote: (note: Note) => void;
    handleDoneChange: (modifiedNote: Note) => void;
    handleContentChange: (newNoteState: Note) => void;
    handleTitleChange: (newNoteState: Note) => void;
}

export interface NoteProps {
    note: Note;
    handleRemoveNote: (note: Note) => void;
    handleDoneChange: (modifiedNote: Note) => void;
    handleContentChange: (newNoteState: Note) => void;
    handleTitleChange: (newNoteState: Note) => void;
}

import { useEffect, useState } from "react";
import { type Note, type UseNotes } from "../types";

let incrementalID = 0

const dataMock = [
    { id: ++incrementalID, title: 'Tarea 1', content: 'Contenido de la tarea 1', done: false },
    { id: ++incrementalID, title: 'Tarea 2', content: 'Contenido de la tarea 2', done: true },
    { id: ++incrementalID, title: 'Tarea 3', content: 'Contenido de la tarea 3', done: false },
    { id: ++incrementalID, title: 'Tarea 4', content: 'Contenido de la tarea 4', done: false },
]


export default function useNotes(): UseNotes {
    const [notes, setNotes] = useState(() => {
        const storedNotes = localStorage.getItem('Notas');
        if (storedNotes) {
            const storedIncrementalID = localStorage.getItem('keyAccumulator');
            incrementalID = storedIncrementalID ? parseInt(storedIncrementalID) : 0;
            return JSON.parse(storedNotes)
        }
        return dataMock;
    });

    useEffect(() => {
        localStorage.setItem('Notas', JSON.stringify(notes))
        localStorage.setItem('keyAccumulator', incrementalID.toString())
    }, [notes])

    const handleAddNote = () => {
        const newNote = {
            id: ++incrementalID,
            title: 'Nueva nota',
            content: 'Erase una vez...',
            done: false
        }

        setNotes((prevState: Note[]) => [...prevState, newNote]);
    }

    const handleRemoveNote = (note: Note) => {
        setNotes((prevState: Note[]) => prevState.filter((item) => {
            return note.id !== item.id
        }))
    }

    const handleDoneChange = (modifiedNote: Note) => {
        setNotes((prevState: Note[]) =>
            prevState.map((note) =>
                note.id === modifiedNote.id ? { ...note, done: !note.done } : note
            )
        )
    }

    const handleContentChange = (newNoteState: Note) => {
        setNotes((prevState: Note[]) => {
            return prevState.map((note) => { return newNoteState.id === note.id ? { ...note, content: newNoteState.content } : note })
        })
    }

    const handleTitleChange = (newNoteState : Note) => {
        setNotes((prevState : Note[]) => {
            return prevState.map((note) => { return newNoteState.id === note.id ? { ...note, title: newNoteState.title } : note })
        })
    }

    return { notes, handleAddNote, handleRemoveNote, handleDoneChange, handleContentChange, handleTitleChange }
}
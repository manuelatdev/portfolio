import { debounce } from 'lodash';
import { useState, useEffect, useRef } from "react";
import './ToDo.css'

let incrementalID = 0

const dataMock = [
    { id: ++incrementalID, title: 'Tarea 1', content: 'Contenido de la tarea 1', done: false },
    { id: ++incrementalID, title: 'Tarea 2', content: 'Contenido de la tarea 2', done: true },
    { id: ++incrementalID, title: 'Tarea 3', content: 'Contenido de la tarea 3', done: false },
    { id: ++incrementalID, title: 'Tarea 4', content: 'Contenido de la tarea 4', done: false },
]


function Note({ note, handleRemoveNote, handleDoneChange, handleContentChange, handleTitleChange }) {

    const handleContentTextChange = debounce((event) => {
        handleContentChange(
            { ...note, content: event.target.value }
        )
    }, 500);

    const handleTitleTextChange = debounce((event) => {
        handleTitleChange(
            { ...note, title: event.target.value }
        )
    }, 500);

    const contentRef = useRef(null);
    const titleRef = useRef(null);


    const adjustTextareaHeight = (e) => {
        e.target.style.height = ''; // Restablece la altura para calcular correctamente
        e.target.style.height = `${e.target.scrollHeight}px`; // Ajusta la altura basada en el contenido
    };

    return (
        <section className={`todo-note ${note.done ? 'done' : ''}`} style={{ borderLeft: note.done ? '5px solid #34D399' : '5px solid #62B4FF' }} >
            <header>

                <textarea ref={titleRef} onInput={(e) => adjustTextareaHeight(e)} placeholder={note.title} className='todo-note-title'  onChange={handleTitleTextChange} />

                <input className="todo-note-done" type="checkbox" onChange={() => { handleDoneChange(note) }} checked={note.done}></input>
                <button className="todo-note-remove" onClick={() => { handleRemoveNote(note) }}></button>
            </header>
            <textarea ref={contentRef} spellCheck={false} onInput={(e) => adjustTextareaHeight(e)} className="todo-note-content" placeholder={note.content} onChange={handleContentTextChange} />
        </section>
    )
}



export default function ToDo() {
    const [notes, setNotes] = useState(() => {
        const storedNotes = localStorage.getItem('Notas');
        if(storedNotes)
            {
                incrementalID = parseInt(localStorage.getItem('keyAccumulator'))
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

        setNotes(prevState => [...prevState, newNote]);
    }

    const handleRemoveNote = (note) => {
        setNotes((prevState) => prevState.filter((item) => {
            return note.id !== item.id
        }))
    }

    const handleDoneChange = (modifiedNote) => {
        setNotes((prevState) =>
            prevState.map((note) =>
                note.id === modifiedNote.id ? { ...note, done: !note.done } : note
            )
        )
    }

    const handleContentChange = (newNoteState) => {
        setNotes((prevState) => {
            return prevState.map((note) => { return newNoteState.id === note.id ? { ...note, content: newNoteState.content } : note })
        })
    }

    const handleTitleChange = (newNoteState) => {
        setNotes((prevState) => {
            return prevState.map((note) => { return newNoteState.id === note.id ? { ...note, title: newNoteState.title } : note })
        })
    }

    return (
        <article className="todo-widget">
            <strong>TODO</strong>
            <section>
                {notes.map(note => (
                    <Note key={note.id} note={note}
                        handleRemoveNote={handleRemoveNote}
                        handleDoneChange={handleDoneChange}
                        handleContentChange={handleContentChange}
                        handleTitleChange={handleTitleChange}
                    />
                ))}
            </section>
            <button onClick={handleAddNote}>Add Note</button>
        </article>
    )
}
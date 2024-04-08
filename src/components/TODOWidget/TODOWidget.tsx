import { debounce } from 'lodash';
import { ChangeEvent, useRef } from "react";
import './TODOWidget.css'
import useNotes from './hooks/useNotes';
import { type Note, type NoteProps } from './types.d';




function Note({ note, handleRemoveNote, handleDoneChange, handleContentChange, handleTitleChange }: NoteProps) {

    const handleContentTextChange = debounce((event: ChangeEvent<HTMLTextAreaElement>) => {
        handleContentChange(
            { ...note, content: event.target.value }
        )
    }, 500);

    const handleTitleTextChange = debounce((event: ChangeEvent<HTMLTextAreaElement>) => {
        handleTitleChange(
            { ...note, title: event.target.value }
        )
    }, 500);

    const contentRef = useRef(null);
    const titleRef = useRef(null);


    const adjustTextareaHeight = (e : ChangeEvent<HTMLTextAreaElement>  ) => {
        e.target.style.height = ''; // Restablece la altura para calcular correctamente
        e.target.style.height = `${e.target.scrollHeight}px`; // Ajusta la altura basada en el contenido
    };

    return (
        <section className={`todo-note ${note.done ? 'done' : ''}`} style={{ borderLeft: note.done ? '5px solid #34D399' : '5px solid #62B4FF' }} >
            <header>

                <textarea ref={titleRef} onInput={(e : ChangeEvent<HTMLTextAreaElement>) => adjustTextareaHeight(e)} placeholder={note.title} className='todo-note-title' onChange={handleTitleTextChange} />

                <input className="todo-note-done" type="checkbox" onChange={() => { handleDoneChange(note) }} checked={note.done}></input>
                <button className="todo-note-remove" onClick={() => { handleRemoveNote(note) }}></button>
            </header>
            <textarea ref={contentRef} spellCheck={false} onInput={(e : ChangeEvent<HTMLTextAreaElement>) => adjustTextareaHeight(e)} className="todo-note-content" placeholder={note.content} onChange={handleContentTextChange} />
        </section>
    )
}



export default function TODOWidget() {
    const {
        notes,
        handleAddNote,
        handleRemoveNote,
        handleDoneChange,
        handleContentChange,
        handleTitleChange } = useNotes()

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
import React, { useState, useRef } from "react";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

import "./AddTask.css";

const AddTask = () => {

    const { addTask } = useContext(GlobalContext);

    const [title, setTitle] = useState("");
    const descriptionRef = useRef(null);
    const statusRef = useRef(null);

    const [error, setError] = useState("");

    const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

    const handleSubmit = async (e) => {
        e.preventDefault();

        //creazione nuovo oggetto con i campi che vengono
        /*      const newTask = {
                 title,
                 description: descriptionRef.current.value,
                 status: statusRef.current.value
             };
             console.log("Nuovo task aggiunto: ", newTask); */

        //primo controllo per campo vuoto
        if (title.trim() === "") {
            setError("Il campo non può essere vuoto");
            return
        }
        //secondo controllo per caratteri speciali - verifico se almeno un carattere della lista è contenuto nella stringa symbols
        const includesInvalidSymbol = [...title].some(char => symbols.includes(char));
        if (includesInvalidSymbol) {
            setError("Il campo non può contenere caratteri speciali");
            return
        }
        //no errori
        setError("");

        const newTask = {
            title,
            description: descriptionRef.current.value,
            status: statusRef.current.value
        }

        try {
            await addTask(newTask);
            alert("Task aggiunto con successo");

            //reset dei campi
            setTitle("");
            if (descriptionRef.current) descriptionRef.current.value = "";
            if (statusRef.current) statusRef.current.value = "To do";
        } catch (error) {
            alert(`Si è verificato un errore: ${error.message}`)
        }
    };



    return (
        <>
            <h2 className="add-task-title">Aggiungi un nuovo task</h2>
            <form onSubmit={handleSubmit} className="add-task-form">
                <label htmlFor="title" className="add-task-label">Task</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="add-task-input"
                />

                {error && <p className="add-task-error">{error}</p>}

                <label htmlFor="description" className="add-task-label" style={{ marginLeft: "2rem" }}>Descrizione</label>
                <textarea
                    id="description"
                    name="description"
                    ref={descriptionRef}
                    required
                    className="add-task-textarea"
                />

                <label htmlFor="status" className="add-task-label" style={{ marginLeft: "2rem" }}>Status</label>
                <select
                    id="status"
                    name="status"
                    ref={statusRef}
                    defaultValue="To do"
                    required
                    className="add-task-select"
                >
                    <option>To do</option>
                    <option>Doing</option>
                    <option>Done</option>
                </select>

                <br />
                <button type="submit" className="add-task-button">Aggiungi Task</button >
            </form >
        </>
    );
};

export default AddTask;

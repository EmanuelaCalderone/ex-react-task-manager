import React, { useState, useRef } from "react";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const AddTask = () => {

    const { addTask } = useContext(GlobalContext);

    const [title, setTitle] = useState("");
    const descriptionRef = useRef(null);
    const statusRef = useRef(null);

    const [error, setError] = useState("");

    const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

    const handleSubmit = async (e) => {
        e.preventDefault();

        //creazione nuovo oggetto con i campi che vengono scritti
        const newTask = {
            title,
            description: descriptionRef.current.value,
            status: statusRef.current.value
        };
        console.log("Nuovo task aggiunto: ", newTask);

        /*  //primo controllo per campo vuoto
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
         setError(""); */

        try {
            await addTask(newTask);
            alert("Task aggiunto con successo");

            //reset dei campi
            setTitle("");
            descriptionRef.current.value = "";
            statusRef.current.value = "To do";
        } catch (error) {
            alert(`Si è verificato un errore: ${error.message}`)
        }
    };



    return (
        <>
            <h2>Aggiungi un nuovo task</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Task</label>
                <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />

                {error && <p>{error}</p>}

                <label htmlFor="description" style={{ marginLeft: "2rem" }}>Descrizione</label>
                <textarea id="description" name="description" ref={descriptionRef} required />

                <label htmlFor="status" style={{ marginLeft: "2rem" }}>Status</label>
                <select id="status" name="status" ref={statusRef} defaultValue="To do" required style={{ padding: "0.5rem" }}>
                    <option>To do</option>
                    <option>Doing</option>
                    <option>Done</option>
                </select>

                <br />
                <button type="submit">Aggiungi Task</button >
            </form >
        </>
    );
};


export default AddTask;
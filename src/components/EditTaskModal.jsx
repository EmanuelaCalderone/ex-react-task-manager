import React, { useState, useRef, useEffect } from "react";
import Modal from "./Modal";

const EditTaskModal = ({ show, onClose, task, onSave }) => {
    //stati locali per i campi del form
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("To do");

    //ref per il submit del form quando si clicca su "salva" (per creare riferimento persistente a elemento DOM/valore senza far scattare nuovo render quando cambia)
    const editFormRef = useRef(null);

    //aggiorno i campi locali ogni volta che cambia il task
    useEffect(() => {
        if (task) {
            setTitle(task.title || "");
            setDescription(task.description || "");
            setStatus(task.status || "To do");
        }
    }, [task]);

    const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";
    const [error, setError] = useState("");

    //funzione per il submit
    const handleSubmit = (e) => {
        e.preventDefault();

        const includesInvalidSymbol = [...title].some(char => symbols.includes(char));
        if (includesInvalidSymbol) {
            setError("Il titolo non può contenere caratteri speciali");
            return;
        }

        setError("");

        //creo oggetto task aggiornato da passare a onSave
        const updatedTask = {
            ...task,
            //sovrascrivo campi con i valori aggiornati
            title,
            description,
            status,
        };

        //chiamo la funzione onSave passata da props con il task aggiornato
        onSave(updatedTask);
    };

    return (
        <Modal
            title="Modifica Task"
            show={show} //booleano
            onClose={onClose}
            confirmText="Salva" //tasto conferma

            //cliccando "Salva" attivo il submit del form con ref
            onConfirm={() => editFormRef.current.requestSubmit()}

            //contenuto modale
            content={

                <form ref={editFormRef} onSubmit={handleSubmit}>
                    <label htmlFor="edit-title">Nome</label>
                    <input
                        type="text"
                        id="edit-title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    {error && <p style={{ color: "red", marginTop: "0.25rem" }}>{error}</p>}

                    <label htmlFor="edit-description">Descrizione</label>
                    <textarea
                        id="edit-description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />

                    <label htmlFor="edit-status">Stato</label>
                    <select
                        id="edit-status"
                        value={status} //valore controllato dallo stato "status"
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    >
                        <option value="To do">To do</option>
                        <option value="Doing">Doing</option>
                        <option value="Done">Done</option>
                    </select>
                </form>
            }
        />
    );
};

export default EditTaskModal;

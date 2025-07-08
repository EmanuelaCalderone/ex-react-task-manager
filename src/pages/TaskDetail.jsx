import { useParams } from "react-router-dom"; //hook di React per leggere i parametri contenuti nell'URL
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";

import { useNavigate } from "react-router-dom" //hook per spostarsi da una pag all'altra senza usare link

import Modal from "../components/Modal";

const TaskDetail = () => {
    //prendo id dall'URL
    const { id } = useParams();
    //prendo l'elenco dei task
    const { tasks, removeTask } = useContext(GlobalContext);
    //creo stato locale per il task specifico
    const [task, setTask] = useState(null);

    const navigate = useNavigate();

    //stato per la modale
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const foundTask = tasks.find((task) => task.id.toString() === id);
        setTask(foundTask)
    }, [id, tasks]);

    if (!task) {
        return <p>Caricamento task...</p> //comportamento di fallback
    };

    //funzione per aprire la modale
    const openModal = () => setShowModal(true);
    //funzione per chiudere la modale
    const closeModal = () => setShowModal(false);


    //funzione per elimianare task
    const handleConfirmDelete = async () => {
        try {
            await removeTask(id) // elimino il task
            alert("Task eliminato");
            navigate("/");
        } catch (error) {
            alert(`Errore: ${error.message}`);
        }
    };

    return (
        <>
            <h2>Dettagli Task</h2>
            <span><strong>Nome:</strong>{task.title}</span>
            <span><strong>Description:</strong>{task.description}</span>
            <span><strong>Stato:</strong>{task.status}</span>
            <span><strong>Creato il:</strong>{task.createdAt}</span>
            <button onClick={openModal}> Elimina task</button >

            <Modal
                title="Conferma eliminazione"
                content="Confermi di voler eliminare il task?"
                show={showModal}
                onClose={closeModal}
                onConfirm={handleConfirmDelete}
                confirmText="Elimina"
            />
        </>
    )
}

export default TaskDetail;
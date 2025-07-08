import { useParams } from "react-router-dom"; //hook di React per leggere i parametri contenuti nell'URL
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";

import { useNavigate } from "react-router-dom" //hook per spostarsi da una pag all'altra senza usare link

import Modal from "../components/Modal";

import EditTaskModal from "../components/EditTaskModal";


const TaskDetail = () => {
    //prendo id dall'URL
    const { id } = useParams();
    //prendo l'elenco dei task
    const { tasks, removeTask, updateTask } = useContext(GlobalContext);
    //creo stato locale per il task specifico
    const [task, setTask] = useState(null);

    const navigate = useNavigate();

    //stato per la modale
    //const [showModal, setShowModal] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        const foundTask = tasks.find((task) => task.id.toString() === id);
        setTask(foundTask)
    }, [id, tasks]);

    if (!task) {
        return <p>Caricamento task...</p> //comportamento di fallback
    };

    //funzione per aprire la modale
    const openDeleteModal = () => setShowDeleteModal(true);
    //funzione per chiudere la modale
    const closeDeleteModal = () => setShowDeleteModal(false);
    //funzione per modificare la modale
    const openEditModal = () => setShowEditModal(true);
    //funzione per chiudere la modale per la modifica
    const closeEditModal = () => setShowEditModal(false);



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

    //funzione per salvare modifica
    const handleSaveEdit = async (updatedTask) => {
        try {
            await updateTask(updatedTask);
            alert("Task modificato con successo");
            closeEditModal();
        } catch (error) {
            alert(`Errore: ${error.message}`);
        }
    };


    return (
        <>
            <h2>Dettagli Task</h2>
            <div class="single-task">


                <p><strong>Nome:</strong>{task.title}</p>
                <p><strong>Description:</strong>{task.description}</p>
                <p><strong>Stato:</strong>{task.status}</p>
                <p>
                    <strong>Creato il:</strong>{" "}
                    {new Date(task.createdAt).toLocaleDateString("it-IT", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                    })}
                </p>

                <button onClick={openDeleteModal}> Elimina task</button >

                <button onClick={openEditModal}>Modifica Task</button>

                {/*modale per eliminare*/}
                <Modal
                    title="Conferma eliminazione"
                    content="Confermi di voler eliminare il task?"
                    show={showDeleteModal}
                    onClose={closeDeleteModal}
                    onConfirm={handleConfirmDelete}
                    confirmText="Elimina"
                />
                {/*modale per aggiornare*/}
                <EditTaskModal
                    show={showEditModal}
                    onClose={closeEditModal}
                    task={task}
                    onSave={handleSaveEdit}
                />
            </div>
        </>
    )
}

export default TaskDetail;
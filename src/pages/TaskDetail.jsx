import { useParams } from "react-router-dom"; //hook di React per leggere i parametri contenuti nell'URL
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";

const TaskDetail = () => {
    //prendo id dall'URL
    const { id } = useParams();
    //prendo l'elenco dei task
    const { tasks } = useContext(GlobalContext);
    //creo stato locale per il task specifico
    const [task, setTask] = useState(null);

    useEffect(() => {
        const foundTask = tasks.find((task) => task.id.toString() === id);
        setTask(foundTask)
    }, [id, tasks]);

    if (!task) {
        return <p>Caricamento task...</p> //comportamento di fallback
    };

    return (
        <>
            <h2>Dettagli Task</h2>
            <span><strong>Nome:</strong>{task.title}</span>
            <span><strong>Description:</strong>{task.description}</span>
            <span><strong>Stato:</strong>{task.status}</span>
            <span><strong>Creato il:</strong>{task.createdAt}</span>
            <button onClick={() => console.log("Task eliminato")}>Elimina task</button>
        </>
    )
}

export default TaskDetail;
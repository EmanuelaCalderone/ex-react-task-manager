import { useState, useEffect } from "react";

function useTasks() {
    const [tasks, setTasks] = useState([]) //inizializzo ad array vuoto

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                console.log("Fetch URL:", `${import.meta.env.VITE_API_URL}/tasks`);
                const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`)
                if (!response.ok) throw new Error("Errore nel fetch");
                const data = await response.json();
                setTasks(data);
                console.log("Tasks:", data)
            } catch (error) {
                console.error("Errore nel fetch dei dati:", error);
            }
        };

        fetchTasks();
    }, []);

    //funzione per aggiungere task
    const addTask = async (newTask) => {

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newTask),
            });

            const data = await response.json();

            if (data.success) {
                setTasks(prevTasks => [...prevTasks, data.task]);
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            throw error;
        }
    };

    //funzione per rimuovere task
    const removeTask = async (taskId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${taskId}`, {
                method: "DELETE",
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.message || "Errore durante la rimozione del task")
            }
            //altrimenti
            setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId))
        } catch (error) {
            throw error;
        }
    };

    //funzione per aggiornare task
    const updateTask = async (updatedTask) => {
        try {
            //chiamata all'API per aggiornare il task specifico
            const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${updatedTask.id}`, {
                method: "PUT", //metodo HTTP per aggiornare la risorsa
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedTask) //conversione oggetto js > stringa JSON
            });

            //coverto la risposta dell'API in oggetto js
            const data = await response.json();

            //se la risposta non ha avuto successo
            if (!data.success) {
                throw new Error(data.message || "Errore durante l'aggiornamento del task");
            }

            //altrimenti
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    //se l'id del task corrente è uguael a quello del task aggiornato, prendo quello aggiornato, altrimenti resta invariato
                    task.id === updatedTask.id ? data.task : task
                )
            );
        } catch (error) { //gestione errore ad es. nel fetch
            throw error;
        }
    };
    return {
        tasks,
        addTask,
        removeTask,
        updateTask
    };
}

export default useTasks;
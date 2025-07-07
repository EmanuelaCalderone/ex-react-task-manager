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

    const addTask = (newTask) => {
        setTasks(prevTasks => [...prevTasks, newTask]);
    }
    const removeTask = (idToBeRemoved) => {
        const updatedTasks = tasks.filter(task => task.id !== idToBeRemoved);
        setTasks(updatedTasks);
    }
    const updateTask = (updatedTask) => {
        setTasks(tasks => tasks.map(task => {
            if (task.id === updatedTask.id) {
                return updatedTask;
            }
            return task;
        }));
    }

    return {
        tasks,
        addTask,
        removeTask,
        updateTask
    };
}

export default useTasks;
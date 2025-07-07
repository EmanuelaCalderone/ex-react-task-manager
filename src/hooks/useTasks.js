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
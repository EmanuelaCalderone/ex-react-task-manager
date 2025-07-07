import React, { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
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

    return (
        <GlobalContext.Provider value={{ tasks, setTasks }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;
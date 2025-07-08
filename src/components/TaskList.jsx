import React, { useContext, useState, useMemo } from "react";
import { GlobalContext } from "../context/GlobalContext";
import TaskRow from "./TaskRow";
import { Link } from "react-router-dom";


const TaskList = () => {

    //uso hook useContext per accedere ai dati condivisi nel GlobalContext e recupero la proprità tasks da quei dati
    const { tasks } = useContext(GlobalContext);

    //stati per ordinamento
    const [sortBy, setSortBy] = useState("createdAt"); //default
    const [sortOrder, setSortOrder] = useState(1); //crescente

    //funzione per ordinare
    const handleSort = (column) => {
        if (sortBy === column) {
            //se clicco sulla stessa colonna, inverto l’ordine
            setSortOrder((prevOrder) => prevOrder * -1);
        } else {
            //se clicco su altra colonna setto ordine crescente
            setSortBy(column);
            setSortOrder(1);
        }
    };

    //logica di ordinamento con useMemo per evitae calcoli inutili: dort solo quando cambiano tasks
    const sortedTasks = useMemo(() => {
        const tasksCopy = [...tasks]; //copia dell'array originale(immutabilità)

        return tasksCopy.sort((a, b) => {
            //variabile che contiene il risultato del confronto tra i due task
            let compareValue = 0;
            if (sortBy === "title") {
                //ordine alfabetico per nome task
                compareValue = a.title.localeCompare(b.title);
            } else if (sortBy === "status") {
                //ordnamento per stato
                const order = { "To do": 1, "Doing": 2, "Done": 3 };
                compareValue = order[a.status] - order[b.status];
            } else if (sortBy === "createdAt") {
                //ordinamento cronologico
                compareValue = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            }

            //applico ordine (crescente o decr) - moltiplico il risultato del confronto per sortOrder per invertire l'ordine se necessario
            return compareValue * sortOrder;
        });
    }, [tasks, sortBy, sortOrder]); //array di dipendenze (ricalcola sortedTasks solo se cambia uno di quesit valori)

    return (
        <>
            <h2>Lista dei task</h2>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th onClick={() => handleSort("title")}>
                                Nome {sortBy === "title" && (sortOrder === 1 ? "↑" : "↓")}
                            </th>
                            <th onClick={() => handleSort("status")}>
                                Stato {sortBy === "status" && (sortOrder === 1 ? "↑" : "↓")}
                            </th>
                            <th onClick={() => handleSort("createdAt")}>
                                Data creazione {sortBy === "createdAt" && (sortOrder === 1 ? "↑" : "↓")}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedTasks.map((task) => (
                            <tr key={task.id}>
                                <td>{task.title}</td>
                                <td>{task.status}</td>
                                <td>{task.createdAt}</td>
                                <td>
                                    <Link to={`/task/${task.id}`}>Dettagli</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default TaskList;
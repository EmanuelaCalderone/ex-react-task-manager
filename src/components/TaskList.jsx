import React, { useContext, useState, useMemo, useCallback, useRef } from "react";
import { GlobalContext } from "../context/GlobalContext";
import TaskRow from "./TaskRow";
import { Link } from "react-router-dom";

import '../App.css'


const TaskList = () => {

    //uso hook useContext per accedere ai dati condivisi nel GlobalContext e recupero la proprità tasks da quei dati
    const { tasks } = useContext(GlobalContext);

    //stati per ordinamento
    const [sortBy, setSortBy] = useState("createdAt"); //default
    const [sortOrder, setSortOrder] = useState(1); //crescente

    //stato per debounce
    const [searchQuery, setSearchQuery] = useState("");

    //ref per il timer debouce
    const debounceTimeout = useRef(null);

    //funzione debounce, aggiorno searchQuery dopo delay
    const debouncedSearch = useCallback((value) => {
        //cancello prev timer
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }
        //imposto nuovo timer
        debounceTimeout.current = setTimeout(() => {
            setSearchQuery(value);
        }, 300); //aggiorno stato solo se non vine digitato altro dall'utente per 300ms
    }, []);

    //funzione onChange input ricerca (non controllato, senza value)
    const handleSearchChange = (e) => {
        const value = e.target.value;
        debouncedSearch(value);
    };


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

    //filtro case-insensitive e ordino con useMemo(tasks, sortBy, sortOrder, searchQuery)
    const filteredSortedTasks = useMemo(() => {
        const filtered = tasks.filter((task) =>
            task.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        //copio per ordinare
        const tasksCopy = [...filtered];

        //ordino
        tasksCopy.sort((a, b) => {
            let compareValue = 0;


            /*   //logica di ordinamento con useMemo per evitae calcoli inutili: sort solo quando cambiano tasks
              const sortedTasks = useMemo(() => {
                  const tasksCopy = [...tasks]; //copia dell'array originale(immutabilità)
  
                  return tasksCopy.sort((a, b) => {
                      //variabile che contiene il risultato del confronto tra i due task
                      let compareValue = 0; */

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
        return tasksCopy;

    }, [tasks, sortBy, sortOrder, searchQuery]); //array di dipendenze (ricalcola sortedTasks solo se cambia uno di quesit valori - aggiunto searchQuery)

    return (
        <>
            <h2>Lista dei task</h2>

            <input
                type="text"
                placeholder="Cerca task"
                onChange={handleSearchChange}
                style={{ marginBottom: "1rem", padding: "0.5rem", width: "100%" }}
            />

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
                        {filteredSortedTasks.map((task) => (
                            <tr key={task.id}>
                                <td>
                                    <Link to={`/task/${task.id}`} className="task-title-link">
                                        {task.title}
                                    </Link>
                                </td>
                                <td
                                    style={{
                                        backgroundColor:
                                            task.status === "To do" ? "yellow" :
                                                task.status === "Doing" ? "red" :
                                                    task.status === "Done" ? "green" :
                                                        "black",
                                        color: task.status === "To do" ? "black" : "white",
                                        padding: "8px",
                                        fontWeight: "bold",
                                        textAlign: "center",
                                        borderRadius: "4px",
                                    }}
                                >
                                    {task.status}
                                </td>
                                <td>{new Date(task.createdAt).toLocaleDateString("it-IT", { day: '2-digit', month: '2-digit', year: '2-digit' })}</td>
                            </tr>
                        ))}
                    </tbody>



                </table>
            </div>
        </>
    );
};

export default TaskList;
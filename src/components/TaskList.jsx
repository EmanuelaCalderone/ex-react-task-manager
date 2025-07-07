import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const TaskList = () => {

    //uso hook useContext per accedere ai dati condivisi nel GlobalContext e recupero la proprità tasks da quei dati
    const { tasks } = useContext(GlobalContext);
    return (
        <>
            <h2>Lista dei task</h2>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Stato</th>
                            <th>Data creazione</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task) => (
                            <tr key={task.id}>
                                <td>{task.title}</td>
                                <td>{task.status}</td>
                                <td>{task.createdAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default TaskList;
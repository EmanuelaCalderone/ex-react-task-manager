import React from "react";

import { Link } from "react-router-dom";


const TaskRow = React.memo(({ task }) => {
    return (
        <tr>
            <td>
                <Link to={`/task/${task.id}`}>{task.title}</Link>
            </td>
            <td style={
                task.status === "To do" ? { backgroundColor: "red" }
                    : task.status === "Doing" ? { backgroundColor: "yellow", color: "black" }
                        : task.status === "Done" ? { backgroundColor: "green" }
                            : {} //else
            }>{task.status}</td>
            <td>{task.createdAt}</td>
        </tr>

    )
})

export default TaskRow;
import React from "react";

const TaskRow = React.memo(({ task }) => {
    return (
        <tr>
            <td>{task.title}</td>
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
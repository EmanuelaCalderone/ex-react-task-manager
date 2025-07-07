import { NavLink } from "react-router-dom";

const Navbar = () => {

    return (
        <nav>
            <NavLink to="/" end style={{ marginRight: "2rem" }}>Lista Task</NavLink>
            <NavLink to="/addtask">Aggiungi Task</NavLink>
        </nav>
    )
}

export default Navbar;
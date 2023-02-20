import * as React from 'react';
import { NavLink } from "react-router-dom";

function NavBar(props) {
    return (
        <ul className='nav-ul'>
            <li onClick={(e)=>props.handlePageSwitch(e.target.name)}><NavLink name="dashboard" className="active" to="/dashboard">Dashboard</NavLink></li>
            <li onClick={(e)=>props.handlePageSwitch(e.target.name)}><NavLink name="chart">Chart Page</NavLink></li>
            <li onClick={(e)=>props.handlePageSwitch(e.target.name)}><NavLink name="add">Add User</NavLink></li>
            <li><NavLink to="/" onClick={props.handleLogOut}>Logout</NavLink></li>
        </ul>
    );
}
export default NavBar;
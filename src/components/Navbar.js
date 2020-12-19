import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = (props) => {
    return (
        <nav>
                <div>
                    <ul>
                        <li>
                            <NavLink exact to="/">Home</NavLink>
                        </li>          
                    {
                        props.isAuth 
                        ? 
                        <>
                            <li>
                                <NavLink  to="/profile">Profile</NavLink>
                            </li>
                            <li>
                                <span onClick={props.handleLogout}>Logout</span>
                            </li>
                        </>
                        : 
                        <>
                            <li>
                                <NavLink to="/signup">Create Account</NavLink>
                            </li>
                            <li>
                                <NavLink to="/login">Login</NavLink>
                            </li>
                        </>
                    }
                    </ul>
                </div>
            
        </nav>
    );
}

export default Navbar;

import React from 'react';
import { NavLink } from 'react-router-dom';

import AuthContext from '../../context/auth-context';
import './MainNavigation.css';

const mainNavigation = props => (
    <AuthContext.Consumer>
        {(context) => {
            return (
                <header className="main-navigation">
                    <div className="main-navigation__holder">
                        <div className="main-navigation__logo">
                            <h1>EZEvent</h1>
                        </div>
                        <div className="main-navigation__spacer"></div>
                        <nav className="main-navigation__items">
                            <ul>
                                {!context.token && <li><NavLink to="/auth">Login</NavLink></li>}
                                <li><NavLink to="/events">Events</NavLink></li>
                                {context.token && <li><NavLink to="/bookings">Bookings</NavLink></li>}
                            </ul>
                        </nav>
                    </div>
                </header>
            )
        }}

    </AuthContext.Consumer>

);

export default mainNavigation;
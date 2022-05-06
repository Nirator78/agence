import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../logo.png'
import Connexion from './Auth/Connexion';
import AccountMenu from './Auth/Profile';
import AuthService from '../services/auth.service';

export default function Headers() {
    const user = AuthService.getUser();

    return (
        <>
            <nav className="flex items-center shadow justify-between flex-wrap  p-6">
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                    <img className="h-14 w-34 ..." src={logo} alt=""></img>
                    
                </div>
                <div className="block lg:hidden">
                    <button className="flex items-center px-3 py-2 border rounded text-sky-700 border-sky-700 hover:text-white hover:border-white">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                    </button>
                </div>
                <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                    <div className="text-sm lg:flex-grow">

                    <NavLink className={({ isActive }) => (isActive ? 'text-sky-700 mr-4' : 'text-dark-200 mr-4 hover:text-sky-700')} to="/">
                        Accueil
                    </NavLink>                
                    <NavLink className={({ isActive }) => (isActive ? 'text-sky-700 mr-4' : 'text-dark-200 mr-4 hover:text-sky-700')} to="/bien">
                        Liste des biens
                    </NavLink>
                    {user?.role === "admin" && (
                        <>
                        <NavLink className={({ isActive }) => (isActive ? 'text-sky-700 mr-4' : 'text-dark-200 mr-4 hover:text-sky-700')} to="/gestion-rendez-vous">
                            Gestion rendez-vous
                        </NavLink>
                        <NavLink className={({ isActive }) => (isActive ? 'text-sky-700 mr-4' : 'text-dark-200 mr-4 hover:text-sky-700')} to="/gestion-agent">
                            Gestion agent
                        </NavLink>
                        </>
                    )}
                    </div>
                </div>
                <>
                    {!user && (
                        <Connexion />
                    )}
                    {user && (
                        <AccountMenu></AccountMenu>
                    )}
                </>
            </nav>
        </>
    )
}

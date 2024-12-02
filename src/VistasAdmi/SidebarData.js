import React from "react";
import { useNavigate } from 'react-router-dom';
import { IoHomeOutline } from "react-icons/io5";
import { LuUserCog, LuUsers, LuClock, LuFileText, LuBarChart2 } from "react-icons/lu";
import { IoMdExit } from "react-icons/io";

export const SidebarData = [
    {
        title: 'Home', 
        path: '/administrador',
        icon: <IoHomeOutline />,
        cName: 'nav-text'
    }, 

    {
        title: 'Mi Perfil', 
        path: '/PerfilAdmi',
        icon: <LuUserCog />,
        cName: 'nav-text'
    }, 

    {
        title: 'Empleados', 
        path: '/Empleados',
        icon: <LuUsers />,
        cName: 'nav-text'
    }, 

    {
        title: 'Registros', 
        path: '/Registros',
        icon: <LuClock />,
        cName: 'nav-text'
    }, 

    {
        title: 'Estadisticas', 
        path: '/Estadisticas',
        icon: <LuBarChart2 />,
        cName: 'nav-text'
    }, 
        
    {
        title: 'Salir', 
        path: '/',
        icon: <IoMdExit />,
        cName: 'nav-text'
    },
]


export default SidebarData;
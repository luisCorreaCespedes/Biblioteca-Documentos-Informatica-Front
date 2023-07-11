import { useState, useEffect, useRef } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import LOGO_UNIVERSIDAD from '../assets/logoUtem.png';
import FOTO_PERFIL from '../assets/book.gif';
import { FaHome, FaChartBar, FaCog, FaPowerOff, FaFile, FaUser, FaGlasses } from 'react-icons/fa';
import '../styles/navbar.css';
import { useAuth } from "../context/AuthContext";

function Navbar() {

    const {logout, user} = useAuth();

    const [isOpen, setIsOpen] = useState(false);

    const [profileOpen, setProfileOpen] = useState(false);

    const navigate = useNavigate();

    let menuRef = useRef();

    useEffect(() => {
        let handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return() => {
            document.removeEventListener('mousedown', handler);
        }
    });

    function inicio() {
        navigate('/inicio');
    }

    function estadisticas() {
        navigate('/estadisticas');
    }

    function configuracion() {
        navigate('/configuracion');
    };

    function nosotros() {
        navigate('/nosotros');
    };

    function subirDocumento() {
        navigate('/subirDocumento');
    }

    function salir() {
        logout();
        navigate('/inicio');
    }

    return (
        <div className='estiloNavbar'>

            <div className='contenedorNavbar'>

                <button onClick={(e) => inicio()}>
                    <div className='contenedorLogo'>
                        <img src={LOGO_UNIVERSIDAD} className='imagen' alt='Logo Universidad' />
                        <span className='tituloTexto'>Biblioteca Virtual</span>
                    </div>
                </button>
        
                <nav className='navbarFull'>
                    <p>¡Bienvenido {user.username}!</p>
                    <div className='contenedorPerfilSesion' ref={menuRef}>
                        <button className='flex flex-row items-center' onClick={(e) => setProfileOpen(!profileOpen)}>
                            <img src={FOTO_PERFIL} className='imagenPerfil' alt='Foto Perfil'/>
                        </button>

                        { profileOpen &&
                            <div>
                                {user.usertype === "admin"?(
                                    <div className='profile'>
                                        <div className='flex flex-col gap-4'>
                                            <li onClick={(e) => {estadisticas(), setProfileOpen(false)}} className='profileEstilo cursor-pointer inline-flex items-center'> <p className='pr-2'><FaChartBar /></p> Estadísticas</li>
                                            <li onClick={(e) => {subirDocumento(), setProfileOpen(false)}} className='profileEstilo cursor-pointer inline-flex items-center'> <p className='pr-2'><FaFile /></p> Subir Documento</li>
                                            <li onClick={(e) => {configuracion(), setProfileOpen(false)}} className='profileEstilo cursor-pointer inline-flex items-center'> <p className='pr-2'><FaCog /></p> Configuración</li>
                                            <li onClick={(e) => {nosotros(), setProfileOpen(false)}} className='profileEstilo cursor-pointer inline-flex items-center'> <p className='pr-2'><FaGlasses /></p> Nosotros</li>
                                            <button className='profileEstilo cursor-pointer inline-flex items-center' onClick={(e) => salir()}> <p className='pr-2'><FaPowerOff /></p> Cerrar Sesión</button>
                                        </div>
                                    </div>
                                ):(
                                    <div className='profileNoAdmin'>
                                        <div className='flex flex-col gap-4'>
                                            <li className='profileEstilo cursor-pointer inline-flex items-center'> <p className='pr-2'><FaChartBar /></p> Estadísticas</li>
                                            <li className='profileEstilo cursor-pointer inline-flex items-center'> <p className='pr-2'><FaGlasses /></p> Nosotros</li>
                                            <button className='profileEstilo cursor-pointer inline-flex items-center' onClick={(e) => salir()}> <p className='pr-2'><FaPowerOff /></p> Cerrar Sesión</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        }
                        
                    </div>
                </nav>

                <button className='botonExpandir' onClick={() => setIsOpen(!isOpen)}>
                    <svg xmlns='http://www.w3.org/2000/svg' className='estiloBotonExpandir' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
                    </svg>
                </button>
            </div>

            { isOpen &&
                <div>
                    { (user.usertype === "admin") ? (
                        <div className='navbarComprimido'>
                            <button onClick={(e) => estadisticas()} className='estiloBotonComprimido'>
                                <div className='inline-flex items-center'>
                                    <p><FaChartBar /></p>
                                    <p className='pl-2'>Estadísticas</p>
                                </div>
                            </button>
                            <button onClick={(e) => subirDocumento()} className='estiloBotonComprimido'>
                                <div className='inline-flex items-center'>
                                    <p><FaFile /></p>
                                    <p className='pl-2'>Subir Documento</p>
                                </div>
                            </button>
                            <button onClick={() => configuracion()} className='estiloBotonComprimido'>
                                <div className='inline-flex items-center'>
                                    <p><FaCog /></p>
                                    <p className='pl-2'>Configuración</p>
                                </div>
                            </button>
                            <button onClick={() => nosotros()} className='estiloBotonComprimido'>
                                <div className='inline-flex items-center'>
                                    <p><FaGlasses /></p>
                                    <p className='pl-2'>Nosotros</p>
                                </div>
                            </button>
                            <button onClick={(e) => salir()} className='estiloBotonComprimido'>
                                <div className='inline-flex items-center'>
                                    <p><FaPowerOff /></p>
                                    <p className='pl-2'>Cerrar Sesión</p>
                                </div>
                            </button>
                        </div>
                    ):(
                        <div className='navbarComprimido'>
                            <button onClick={(e) => estadisticas()} className='estiloBotonComprimido'>
                                <div className='inline-flex items-center'>
                                    <p><FaChartBar /></p>
                                    <p className='pl-2'>Estadísticas</p>
                                </div>
                            </button>
                            <button className='estiloBotonComprimido'>
                                <div className='inline-flex items-center'>
                                    <p><FaGlasses /></p>
                                    <p className='pl-2'>Nosotros</p>
                                </div>
                            </button>
                            <button onClick={(e) => salir()} className='estiloBotonComprimido'>
                                <div className='inline-flex items-center'>
                                    <p><FaPowerOff /></p>
                                    <p className='pl-2'>Cerrar Sesión</p>
                                </div>
                            </button>
                        </div>
                    )

                    }
                </div>
            }

        </div>
    )
}


export default Navbar;

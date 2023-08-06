import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import LOGO_UNIVERSIDAD from '../assets/logoUtem.png';
import '../styles/login.css';
import { registerRequest } from '../api/auth';
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

function Registro() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { logout, user, signup, errors: signinErrors, isAuthenticated } = useAuth();

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = handleSubmit(async (values) => {
        signup(values);
        navigate("/inicio");
        
    });

    useEffect(() => {
        logout()
    },[user])

    

    return (
        <section className='contenedorPantalla'>
            <div className='contenedorRegister'>
                <div className='w-full'>
                <div className='contenedorTitulo flex items-center justify-between'>
                    <div>
                        <h1 className='titulo'>Biblioteca Virtual</h1>
                        <h1 className='titulo'>Trabajos de Titulación</h1>
                    </div>
                    <div>
                        <img className='logoUtem' src={LOGO_UNIVERSIDAD} alt='' />
                    </div>
                    </div>
                    <hr className='separador' />
                    <h1 className='textoDescriptivo'>Documentos de Trabajos de Titulación de la Escuela de Informática</h1>
                    <h1 className='textoEnfasis text-base'>Registro de Nuevo Usuario</h1>

                    <form className='contenedorFormulario' onSubmit={ (register("usertype", { value: 'user' }), onSubmit) }>
                        <div className='mt-4'>
                            <label className='labelCampoFormulario text-sm'>Nombre Usuario</label>
                            <input className='inputCampoFormulario text-xs' type='text' name='' id='username' placeholder='Ingrese su nombre' required {...register("username", { required: true })} />
                        </div>
                        <div className='mt-4'>
                            <label className='labelCampoFormulario text-sm'>Correo Institucional</label>
                            <input className='inputCampoFormulario text-xs' type='email' name='' id='email' placeholder='Ingrese su correo' required {...register("email", { required: true })} />
                        </div>
                        <div className='mt-4 relative password-input'>
                            <label className='labelCampoFormulario text-sm'>Contraseña</label>
                                <div className='password-input'>
                                    <input
                                    className='inputCampoFormulario pr-12 text-xs'
                                    type={showPassword ? 'text' : 'password'}
                                    name=''
                                    id='pass'
                                    placeholder='Nueva contraseña'
                                    minLength='6'
                                    required
                                    {...register("password", { required: true })}
                                    />
                                    <div
                                    className='toggle-password absolute top-11 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500 text-xl transition-colors hover:text-gray-800'
                                    onClick={togglePasswordVisibility}
                                    >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                        </div>
                        {signinErrors.map((error, i) => (
                        <div className='rounded-lg bg-red-500 mt-4 p-2 text-white text-center' key={i}>
                            {error}
                        </div>
                        ))}
                        <div className='contenedorBoton'>
                        <button type='submit' className='block text-sm bg-[#2A3547] hover:bg-[#475875] focus:bg-[#475875] text-white font-montserrat font-normal rounded-md px-6 py-2 mt-10'>Registrarse</button>
                        </div>
                    </form>

                    <div className='contenedorFooter'>
                        <footer className='estiloFooter'>
                        <hr className='separador' />
                        <p className='textoFooter'>Plataforma desarrollada por UTEM</p>
                        <p className='textoFooter'>2023 © UTEM - Todos los Derechos Reservados</p>
                        </footer>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Registro;

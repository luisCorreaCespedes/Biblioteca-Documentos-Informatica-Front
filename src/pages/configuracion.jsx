import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Modal from "react-modal";
import DONE from '../assets/done.png';
import LOADING from '../assets/loading.gif';
import ALERTA from '../assets/alert.png';
import Navbar from "../components/navbar";
import Footer from '../components/footer';
import emailjs from '@emailjs/browser';
import '../styles/home.css';
import '../styles/buscador.css';
import '../styles/documentoTitulo.css';
import '../styles/modales.css';

function Configuracion() {
    Modal.setAppElement('body');
    Modal.defaultStyles.overlay.backgroundColor = 'transparent';

    const navigate = useNavigate();
    const {register, handleSubmit} = useForm();
    const { user, allUser, getUser, deleteUser, updateUser } = useAuth();
    const [showDelete, setShowDelete] = useState(false);
    const [showModify, setShowModify] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [email, setEmail] = useState('');
    const [emailOK, setEmailOK] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [emailLoading, setEmailLoading] = useState(false);

    const handleInputChange = (event) => {
        setEmail(event.target.value);
        console.log(email);
    };

    const handleClick = (allUser) => {
        setSelectedUser(allUser);
        setShowDelete(true);
    };

    const handleModify = (allUser) => {
        setSelectedUser(allUser);
        setShowModify(true);
    };

    const deleteConfirm = () => {
        document.getElementById('delImg').setAttribute("src", DONE);
        document.getElementById('delTxt').innerText = "Usuario eliminado con Éxito";
        document.getElementById('delBtn').innerText = "";
    };

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        setShowCreate(false);
        setEmailLoading(true);
        emailjs.sendForm('service_nzfb1d2', 'template_45zpxxd', form.current, 'NT6UDDcUdj_RgflL5')
        .then((result) => {
            setShowCreate(false);
            console.log(result.text);
            setEmailLoading(false);
            setEmailOK(true);
        }, (error) => {
            console.log(error.text);
        });
    };

    const onSubmit = handleSubmit(async (data) => {
        try {
            await updateUser(selectedUser._id, data); 
        } catch (error) {
            console.log(error);
        }
        setShowModify(false);
    });

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div>
            <Navbar />
            <div className='items-center justify-center pt-24 pb-16 mx-8'>
                <div className="flex flex-row justify-between">
                    <div className='pb-6 flex-col'>
                        <h3 className='text-lg font-montserrat leading-tight font-semibold'>Lista de Usuarios</h3>
                        <hr className='border-gray-400 border leading-tight w-full' />
                    </div>
                    <div>
                    <button onClick={() => setShowCreate(true)} className="bg-[#2A3547] hover:bg-[#475875] text-white text-sm px-4 py-1 rounded-md">
                                Añadir Usuario
                    </button>
                    { showCreate &&
                        <Modal isOpen={showCreate} className='contenedorEliminar'>
                                <div className='contenedorEliminar'>
                                    <div className='tamanoContenedorEliminar w-[85%] sm:w-[75%] md:w-[50%] lg:w-[35%]'>
                                        <div className='bordeContenedorEliminar'>
                                            <div className='cabeceraContenedorEliminar'>
                                                <button className='btnX' onClick={() => setShowCreate(false)}> <span className='X'>x</span> </button>
                                            </div>
                                            <form ref={form} onSubmit={sendEmail}>
                                                <div className='mt-4 px-8'>
                                                    <label className='labelCampoFormulario font-medium text-base pb-4'>Ingresa el Correo electrónico para registrar al usuario.</label>
                                                    <input
                                                    onChange={handleInputChange}
                                                    className='inputCampoFormulario text-sm'
                                                    type='email'
                                                    value={email}
                                                    placeholder='Ingrese el Correo electrónico...'
                                                    required
                                                    autoComplete='on'
                                                    name="user_email"
                                                    />
                                                </div>
                                            <div className='flex flex-row items-end justify-end mr-2 mb-3 mt-8' id='delBtn'>
                                                <button type="submit" className='botonModales bg-green-500 hover:bg-green-400'>Enviar</button>
                                                <button onClick={() => setShowCreate(false)} className='botonModales'>Volver</button>
                                            </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className='posicionContenedor'></div>
                        </Modal>
                    }
                    {
                        emailOK && 
                        <Modal isOpen={emailOK} className='contenedorEliminar'>
                            <div className='contenedorEliminar'>
                                <div className='tamanoContenedorEliminar'>
                                    <div className='bordeContenedorEliminar'>
                                        <div className='cabeceraContenedorEliminar'>
                                            <button className='btnX' onClick={() => setEmailOK(false)}> <span className='X'> x </span> </button>
                                        </div>
                                        <div className='cuerpoEliminar'>
                                            <img src={DONE} alt='Exito' className='imagenExito'/>
                                            <h3 className='textoAlerta mb-12 pt-4'> Se ha mandado correctamente el Correo de invitación al usuario.</h3>
                                         </div>
                                    </div>
                                </div>
                            </div>
                            <div className='posicionContenedor'></div>
                        </Modal>
                    }
                    {
                        emailError && 
                        <Modal isOpen={emailError} className='contenedorEliminar'>
                            <div className='contenedorEliminar'>
                                <div className='tamanoContenedorEliminar'>
                                    <div className='bordeContenedorEliminar'>
                                        <div className='cabeceraContenedorEliminar'>
                                            <button className='btnX' onClick={() => setEmailError(false)}> <span className='X'> x </span> </button>
                                        </div>
                                        <div className='cuerpoEliminar'>
                                            <img src={ALERTA} alt='Alerta' className='imagenAlerta'/>
                                            <h3 className='textoAlerta mb-12 pt-4'> Ha ocurrido un error. Intente nuevamente.</h3>
                                         </div>
                                    </div>
                                </div>
                            </div>
                            <div className='posicionContenedor'></div>
                        </Modal>
                    }
                    {
                        emailLoading && 
                        <Modal isOpen={emailLoading} className='contenedorEliminar'>
                            <div className='contenedorEliminar'>
                                <div className='tamanoContenedorEliminar'>
                                    <div className='bordeContenedorEliminar'>
                                        <div className='cuerpoEliminar'>
                                            <img src={LOADING} alt='Cargando' className='imagenCargando pt-10'/>
                                            <h3 className='textoAlerta mb-12 pt-4'> Enviando Correo al usuario...</h3>
                                         </div>
                                    </div>
                                </div>
                            </div>
                            <div className='posicionContenedor'></div>
                        </Modal>
                    }
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        <div className="border rounded-lg border-gray-400 bg-white p-3 flex flex-col">
                            <div className="flex-grow">
                                <h2 className="text-base font-bold mb-2 flex flex-row">Usuario: <p className="font-medium pl-2">{user.username}</p></h2>
                                <h2 className="text-sm font-medium mb-2 italic flex flex-row">Email: <p className="font-medium pl-2">{user.email}</p></h2>
                                <h2 className="text-sm font-medium mb-2 italic flex flex-row">Rol: <p className="font-medium pl-2">{user.usertype}</p></h2>
                            </div>
                            <div className="self-end justify-end">
                                <button disabled className="bg-white text-white text-sm px-4 py-3 rounded-md" >
                                    
                                </button>
                            </div>
                        </div>
                    {allUser.filter(users => user.email !== users.email).map(users => (
                       <div key={users._id} className="border rounded-lg border-gray-400 bg-white p-3 flex flex-col">
                            <div className="flex-grow">
                                <h2 className="text-base font-bold mb-2 flex flex-row">Usuario: <p className="font-medium pl-2">{users.username}</p></h2>
                                <h2 className="text-sm font-medium mb-2 italic flex flex-row">Email: <p className="font-medium pl-2">{users.email}</p></h2>
                                <h2 className="text-sm font-medium mb-2 italic flex flex-row">Rol: <p className="font-medium pl-2">{users.usertype}</p></h2>
                            </div>
                            <div className="self-end justify-end">
                                <button className="bg-[#2A3547] hover:bg-[#475875] text-white text-sm px-3 py-1 mr-2 rounded-md" onClick={() => handleModify(users)}>
                                    Cambiar Rol
                                </button>
                                <button className="bg-red-500 hover:bg-red-400 text-white text-sm px-4 py-1 rounded-md" onClick={() => handleClick(users)}>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                    { showDelete && selectedUser &&
                        <Modal isOpen={showDelete} className='contenedorEliminar'>
                                <div className='contenedorEliminar'>
                                    <div className='tamanoContenedorEliminar'>
                                        <div className='bordeContenedorEliminar'>
                                            <div className='cabeceraContenedorEliminar'>
                                                <button className='btnX' onClick={() => setShowDelete(false)}> <span className='X'>x</span> </button>
                                            </div>
                                            <div className='cuerpoEliminar'>
                                                <img src={ALERTA} alt='Alerta' className='imagenAlerta' id='delImg'/>
                                                <h3 className='textoAlerta mb-8 pt-2 text-center' id='delTxt'> ¿Está seguro de eliminar al Usuario {selectedUser.username} ?</h3>
                                                
                                            </div>
                                            <div className='flex flex-row items-end justify-end mr-2 mb-3 mt-2' id='delBtn'>
                                                <button onClick={() => {deleteUser(selectedUser._id), deleteConfirm()}} className='botonModales bg-red-500 hover:bg-red-400'>Eliminar</button>
                                                <button onClick={() => setShowDelete(false)} className='botonModales'>Volver</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='posicionContenedor'></div>
                        </Modal>
                    }
                    { showModify && selectedUser &&
                        <Modal isOpen={showModify} className='contenedorEliminar'>
                               <div className='contenedorEliminar'>
                                    <div className='tamanoContenedorEliminar w-[85%] sm:w-[75%] md:w-[50%] lg:w-[35%]'>
                                        <div className='bordeContenedorEliminar'>
                                            <div className='cabeceraContenedorEliminar'>
                                                <button className='btnX' onClick={() => setShowModify(false)}> <span className='X'>x</span> </button>
                                            </div>
                                            <form onSubmit={onSubmit} className="ml-6">
                                                <div className='mt-4 items-center'>
                                                    <label className='labelCampoFormulario text-base font-semibold pb-4'>Tipo de Usuario</label>
                                                    <input
                                                        type='radio'
                                                        id='user'
                                                        value='user'
                                                        className='mr-2'
                                                        {...register("usertype", { required: true })}
                                                        required
                                                    />
                                                    <label className='font-montserrat text-sm' htmlFor='user'>Usuario Común</label>
                                                    <input
                                                        type='radio'
                                                        id='admin'
                                                        value='admin'
                                                        {...register("usertype", { required: true })}
                                                        className='ml-8 mr-2'
                                                        required
                                                    />
                                                    <label className='font-montserrat text-sm' htmlFor='admin'>Administrador</label>
                                                </div>
                                                <div className='flex flex-row items-end justify-end mr-2 mb-3 mt-10' id='delBtn'>
                                                    <button className='botonModales bg-green-500 hover:bg-green-400'>Modificar</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className='posicionContenedor'></div>
                        </Modal>
                    }

                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Configuracion;
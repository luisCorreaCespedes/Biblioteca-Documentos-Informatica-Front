// Declaración de importaciones
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import NUBE from '../assets/cloud-upload.png';
import ALERTA from '../assets/alert.png';
import LOADING from '../assets/loading.gif';
import DONE from '../assets/done.png';
import '../styles/subirDocumento.css';
import '../styles/modales.css';
import { useDocs } from '../context/DocsContext';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { useNavigate, useParams } from "react-router-dom";
import appFirebase from '../firebase/firebase';
import { getStorage, getDownloadURL, uploadBytes, ref, deleteObject } from 'firebase/storage';
import {v4} from 'uuid';

const storage = getStorage(appFirebase);
// Función principal SUBIRDOCUMENTO
function SubirDocumento() {

    const navigate = useNavigate();
    const {register, handleSubmit, setValue, reset} = useForm();
    const {createDoc, getDoc, updateDoc} = useDocs();
    const params = useParams();
    
    const [fileDocument, setFileDocument] = useState(null);
    const [modalCargando, setModalCargando] = useState(false);
    const [modalExito, setModalExito] = useState(false);
    const [modalError, setModalError] = useState(false);

    let fileDoc = null;

    useEffect(() => {
        async function loadDoc() {
            if (params.id) {
                const doc = await getDoc(params.id);
                setValue("title", doc.title);
                setValue("student", doc.student);
                setValue("teacher", doc.teacher);
                setValue("year", doc.year);
                setValue("career", doc.career);
                setValue("mode", doc.mode);
                setValue("url", doc.url);
            } else {
                reset();
            }
        }
        loadDoc();
    }, [params.id]);

    const capturarDoc = (e) => {
        console.log(fileDoc)
        fileDoc = e;
        if (fileDoc === null || fileDoc === undefined) {
            document.getElementById('fileName').innerHTML = 'Haz clic para seleccionar un archivo';
            fileDoc = null;
        }
        else {
            fileDoc = e;
            document.getElementById('fileName').innerHTML = fileDoc.name;
        }
        console.log(fileDoc)
    };

    const guardarDatos = async () => {
        try {
          const storageRef = ref(storage, `${v4()}.pdf`);
          await uploadBytes(storageRef, fileDoc);
          const downloadURL = await getDownloadURL(storageRef);
          return downloadURL;
        } catch (error) {
          console.log(error);
          throw error;
        }
      };
      
      const obtenerResultado = async () => {
        try {
          const res = await guardarDatos();
          return res;
        } catch (error) {
          console.log(error);
          throw error;
        }
      };
      
      const onSubmit = handleSubmit(async (data) => {
        try {
            if (params.id) {
                setModalCargando(true);
                if (fileDoc) {
                    const upload = await obtenerResultado();
                    console.log(upload);
                    register("url", { value: upload });
                    //Se borra el doc anterior
                    const desertRef = ref(storage, data.url);
                    await deleteObject(desertRef);
                    await updateDoc(params.id, { ...data, url: upload }); // Actualizamos el documento con la URL actualizada
                } else {
                    await updateDoc(params.id, data);
                }
                setModalCargando(false);
                setModalExito(true);
            } else {
                setModalCargando(true);
                const upload = await obtenerResultado();
                console.log(upload);
                register("url", { value: upload });
                await createDoc({ ...data, url: upload });
                setModalCargando(false);
                setModalExito(true);
            }
        } catch (error) {
            console.log(error);
            setModalError(true);
        }
      });

  
    return (
        <div>
            <Navbar />
            <div className='contenedorSubirDocumento pt-20'>

            <div className='tamanoContenedorSubirDocumento'>
                { params.id ? 
                    <p className='textoDescripcion text-green-700'>Edita los campos necesarios del Documento seleccionado.</p> :
                    <p className='textoDescripcion'>Almacena los Documentos de Título en la plataforma.</p> 
                }

                <form onSubmit={onSubmit} className='estiloFormularioSubirDocumento'>

                    <div className='mb-4'>
                        <p className='textoCampo'> Título del Documento </p>
                        <input className='estiloInputCampo' type='text' required placeholder='Ingresa nombre del Documento...' {...register("title")}/>
                    </div>

                    <div className='mb-4 md:flex md:flex-row'>
                        <div className='md:w-1/2 md:pr-4'>
                            <p className='textoCampo'> Estudiante </p>
                            <input className='estiloInputCampo' type='text' required placeholder='Ingresa nombre del Estudiante...' {...register("student")}/>
                        </div>
                        <div className='md:w-1/2 mt-4 md:mt-0'>
                            <p className='textoCampo'> Profesor Guía </p>
                            <input className='estiloInputCampo' type='text' required placeholder='Ingresa nombre del Profesor Guía...' {...register("teacher")}/>
                        </div>
                    </div>

                    <div className='flex mb-4'>
                        <div className='w-1/4'>
                            <p className='textoCampo'> Año </p>
                            <input className='estiloInputCampo' type='number' required placeholder='Ingresa año...' min={1950} max={2050} {...register("year")}/>
                        </div>
                        <div className='w-1/4 pl-4'>
                            <p className='textoCampo'> Carrera </p>
                            <div>
                                <select className='estiloSelectorCampo' required {...register("career")}>
                                    <option value=''>---</option>
                                    <option value='Ing. Civil en Computación mención Informática'>21041</option>
                                    <option value='Ing. en Informática'>21030</option>
                                </select> 
                            </div>
                        </div>
                        <div className='w-2/4 pl-4'>
                            <p className='textoCampo'> Modalidad </p>
                            <div>
                                <select className='estiloSelectorCampo' required {...register("mode")}>
                                    <option value=''>---</option>
                                    <option value='Desarrollo Software'>Desarrollo Software</option>
                                    <option value='Investigación Aplicada'>Investigación Aplicada</option>
                                    <option value='Proyecto Empresa'>Proyecto Empresa</option>
                                    <option value='Proyecto I+D'>Proyecto I+D</option>
                                </select> 
                            </div>
                        </div>
                    </div>
                    
                    { params.id ?
                        <section className='contenedorDragDrop'> 
                            <label className='dragDrop' htmlFor='uploadDoc'>
                            <img src={NUBE} alt='Cloud' className='w-10 pt-2 pb-2'/>
                            <p className='pt-2 pb-2 italic text-red-900 font-bold' id='fileName'>Haz clic para seleccionar un archivo</p>
                            </label>
                            <input type='file' accept="application/pdf" onChange={(e) => capturarDoc(e.target.files[0])} id='uploadDoc'/>
                        </section> 
                        :
                        <section className='contenedorDragDrop'> 
                            <label className='dragDrop' htmlFor='uploadDoc'>
                            <img src={NUBE} alt='Cloud' className='w-10 pt-2 pb-2'/>
                            <p className='pt-2 pb-2 italic text-red-900 font-bold' id='fileName'>Haz clic para seleccionar un archivo</p>
                            </label>
                            <input type='file' accept="application/pdf" onChange={(e) => capturarDoc(e.target.files[0])} id='uploadDoc' required/>
                        </section>
                    }
                    
                    <div className='botonesAlmacenar'>
                        <button className='w-50 text-xs md:text-sm block bg-[#2A3547] hover:bg-[#475875] focus:bg-[#475875] text-white font-montserrat font-normal rounded-md px-4 py-2 mt-2 mb-2'>
                            Almacenar Documento
                        </button>
                    </div>

                </form>

            </div>

            { modalCargando ? (
                <>
                    <div className='contenedorEliminar'>
                        <div className='tamanoContenedorEliminar'>
                            <div className='bordeContenedorEliminar'>
                                <div className='cuerpoEliminar'>
                                    <img src={LOADING} alt='Cargando' className='imagenCargando mt-6'/>
                                    <h3 className='textoAlerta mb-8'> Subiendo Documento . . .  </h3>  
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='posicionContenedor'></div>
                </>
            ):null}

            { modalExito ? (
                <>
                    <div className='contenedorEliminar'>
                        <div className='tamanoContenedorEliminar'>
                            <div className='bordeContenedorEliminar'>
                                <div className='cabeceraContenedorEliminar'>
                                    <button
                                        className='ml-auto bg-transparent border-0 text-black float-right text-sm leading-none font-semibold outline-none focus:outline-none'
                                        onClick={() => {setModalExito(false), navigate('/inicio')}}>
                                        <span className='text-black h-6 w-6 text-lg block outline-none focus:outline-none'>
                                        x
                                        </span>
                                    </button>
                                </div>
                                <div className='cuerpoEliminar'>
                                    <img src={DONE} alt='Exito' className='imagenExito'/>
                                    { params.id ?
                                        <h3 className='textoAlerta mb-12'> Documento modificado con Éxito! </h3> :
                                        <h3 className='textoAlerta mb-12'> Documento almacenado con Éxito! </h3>
                                    }  
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='posicionContenedor'></div>
                </>
            ):null}

            { modalError ? (
                <>
                    <div className='contenedorEliminar'>
                        <div className='tamanoContenedorEliminar'>
                            <div className='bordeContenedorEliminar'>
                                <div className='cabeceraContenedorEliminar'>
                                    <button
                                        className='ml-auto bg-transparent border-0 text-black float-right text-sm leading-none font-semibold outline-none focus:outline-none'
                                        onClick={() => setModalError(false)}>
                                        <span className='text-black h-6 w-6 text-lg block outline-none focus:outline-none'>
                                        x
                                        </span>
                                    </button>
                                </div>
                                <div className='cuerpoEliminar'>
                                    <img src={ALERTA} alt='Error' className='imagenError'/>
                                    <h3 className='textoAlerta mb-12'> Oh No! El documento no se ha almacenado. Intente nuevamente. </h3>  
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='posicionContenedor'></div>
                </>
            ):null}

            <Footer />
            </div>
        </div>

    );
}



export default SubirDocumento;
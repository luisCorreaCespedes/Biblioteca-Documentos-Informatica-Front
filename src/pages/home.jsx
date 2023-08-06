// Declaración de importaciones
import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useDocs } from '../context/DocsContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
import appFirebase from '../firebase/firebase';
import { getStorage, ref, deleteObject, getDownloadURL } from "firebase/storage";
import { saveAs } from 'file-saver';
import Modal from "react-modal";
import LOGO_UNIVERSIDAD from '../assets/logoUtem.png';
import DONE from '../assets/done.png';
import ALERTA from '../assets/alert.png';
import Navbar from "../components/navbar";
import Footer from '../components/footer';
import '../styles/home.css';
import '../styles/buscador.css';
import '../styles/documentoTitulo.css';
import '../styles/modales.css';

const storage = getStorage();
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// Función principal HOME
function Home() {
    
    Modal.setAppElement('div');
    Modal.defaultStyles.overlay.backgroundColor = 'transparent';
    
    const navigate = useNavigate();
    const { user } = useAuth();
    const { getDocs, docs, deleteDoc } = useDocs();
    const [showModal, setShowModal] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [width, setWidth] = useState(window.innerWidth);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedStudy, setSelectedStudy] = useState('');
    const [selectedMode, setSelectedMode] = useState('');

    const filteredDocs = docs.filter(doc => {
        const isTitleMatch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
        const isYearMatch = selectedYear === '' || doc.year === selectedYear;
        const isStudyMatch = selectedStudy === '' || doc.career === selectedStudy;
        const isModeMatch = selectedMode === '' || doc.mode === selectedMode;
        
        return isTitleMatch && isYearMatch && isStudyMatch && isModeMatch;
    });

    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 9;

    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;

    const paginatedResults = filteredDocs.slice(indexOfFirstResult, indexOfLastResult);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(filteredDocs.length / resultsPerPage);

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };
      
    const handleYearChange = (event) => {
        if (event.target.value == '') {
            setSelectedYear(event.target.value);
        } else {
            const selectedYear = parseInt(event.target.value, 10);
            setSelectedYear(selectedYear);
        }
    };
      
    const handleStudyChange = (event) => {
        setSelectedStudy(event.target.value);
    };
      
    const handleModeChange = (event) => {
        setSelectedMode(event.target.value);
    };

    window.addEventListener('resize', function(event){
        setWidth(window.innerWidth)
    });

    const openNewTab = (urlDoc) => {
        window.open(urlDoc, '_blank');
    };

    const saveDoc = (urlDoc, nameDoc) => {
        saveAs(urlDoc, `${nameDoc}.pdf`);
    };

    const handleClick = (docs) => {
        setSelectedDoc(docs);
        setShowModal(true);
    };

    const deleteConfirm = (url) => {
        const desertRef = ref(storage, url);
        deleteObject(desertRef).then(() => {
          }).catch((error) => {
            console.log(error);
          });
        document.getElementById('delImg').setAttribute("src", DONE);
        document.getElementById('delTxt').innerText = "Documento eliminado con Éxito";
        document.getElementById('delBtn').innerText = "";
    };
    
    function updateConfirm(id) {
        navigate(`/actualizar/${id}`);
    };

    useEffect(() => {
        getDocs();
    }, []);

    return (
        <div>
            <Navbar />
            <div>
                <div className='pt-20'>
                    <p className='textoExplicacion'>Ingresa una palabra o frase para comenzar a buscar.</p>
                </div>
                <form className='formularioGeneral'>   
                    <label className='labelBuscador' htmlFor='default-search'>Buscar</label>
                    <div className='contenedorBuscador'>
                        <div className='flex flex-row'>
                            <input className='inputEstilo' 
                                placeholder='Ingrese algo para buscar...'
                                type='search'
                                id='default-search'
                                value={searchQuery}
                                onChange={handleSearchInputChange}
                            />
                        </div>
                    </div>
                </form>
                <div className='contenedorFiltros'>
                    <select className='ml-3 estilosFiltros' id='year' defaultValue={selectedYear} onChange={handleYearChange}>
                        <option value=''>Por Año</option>
                        <option value='2012'>2012</option>
                        <option value='2013'>2013</option>
                        <option value='2014'>2014</option>
                        <option value='2015'>2015</option>
                        <option value='2016'>2016</option>
                        <option value='2017'>2017</option>
                        <option value='2018'>2018</option>
                        <option value='2019'>2019</option>
                        <option value='2020'>2020</option>
                        <option value='2021'>2021</option>
                        <option value='2022'>2022</option>
                        <option value='2023'>2023</option>
                    </select>
                    <select className='mx-1 estilosFiltros' id='study' defaultValue={selectedStudy} onChange={handleStudyChange}>
                        <option value=''>Por Carrera</option>
                        <option value='Ing. en Informática'>21030</option>
                        <option value='Ing. Civil en Computación mención Informática'>21041</option>
                        <option value='Ing. Civil en Ciencia de Datos'>21049</option>
                    </select>
                    <select className='mr-3 estilosFiltros' id='mode' defaultValue={selectedMode} onChange={handleModeChange}>
                        <option value=''>Por Modalidad</option>
                        <option value='Desarrollo Software'>Desarrollo Software</option>
                        <option value='Investigación Aplicada'>Investigación Aplicada</option>
                        <option value='Proyecto Empresa'>Proyecto Empresa</option>
                        <option value='Proyecto I+D'>Proyecto I+D</option>
                    </select>   
                </div>
            </div>

            <div className='contenedorResultados'>
                <div className='estilosResultados'>
                    { docs.length === 0 ? 
                        <div className='flex flex-col items-center justify-center pt-12'>
                        <img src={LOGO_UNIVERSIDAD} className='w-24' alt='Logo Universidad' />
                    </div> 
                    : <div>
                        <h3 className='estiloTexto font-semibold'> Todos los Documentos</h3> 
                        <hr className='separadorResultados' />
                    </div>
                    }
                    
                </div>
            </div>

            <div className='contenedorDocumentos' >
                <div className='gridDocumentos' >
                { paginatedResults.map(doc =>(
                    <div className="estiloCarta" key={doc._id} onClick={() => handleClick(doc)}>
                        <div className='estiloPortada'>
                            <Document file={doc.url} loading={'Cargando PDF...'} error={'Cargando PDF...'}>
                                <Page pageNumber={1} width={130} renderAnnotationLayer={false} renderTextLayer={false} loading={'Cargando Portada'}/>
                            </Document>
                        </div>
                        <div className='estiloInformacion'>
                            <h2 className='textoTitulo'>{doc.title}</h2>
                            <h2 className='textoInfo'>ESTUDIANTE: <p className='pl-2 font-normal'>{doc.student}</p> </h2>
                            <h2 className='textoInfo'>PROFESOR GUÍA: <p className='pl-2 font-normal'>{doc.teacher}</p> </h2>
                            <h2 className='textoInfo'>AÑO: <p className='pl-2 font-normal'>{doc.year}</p> </h2>
                            <h2 className='textoInfo'>CARRERA: <p className='pl-2 font-normal'>{doc.career}</p> </h2>
                            <h2 className='textoInfo'>MODALIDAD: <p className='pl-2 font-normal'>{doc.mode}</p> </h2>
                        </div> 
                    </div>
                    ))
                }
                { showModal && selectedDoc && (
                    <Modal isOpen={showModal} className='contenedorEliminar'>
                        <div className='contenedorEliminar'>
                            <div className='tamanoContenedorEliminar'>
                                <div className='bordeContenedorEliminar'>
                                    <div className='cabeceraContenedorEliminar'>
                                        <button className='btnX' onClick={() => setShowModal(false)}> <span className='X'>x</span> </button>
                                    </div>
                                    <div className="estiloCartaModal">
                                        <div className='estiloPortadaModal'>
                                            <Document file={selectedDoc.url} loading={'Cargando PDF...'} error={'Cargando PDF...'}>
                                                <Page pageNumber={1} width={width <= 768 ? 130 : 250} renderAnnotationLayer={false} renderTextLayer={false} loading={'Cargando Portada'}/>
                                            </Document>
                                        </div>
                                        <div className='estiloInformacion mt-4'>
                                            <h2 className='textoTituloModal'>{selectedDoc.title}</h2>
                                            <h2 className='textoInfoModal'>ESTUDIANTE: <p className='pl-2 font-normal'>{selectedDoc.student}</p> </h2>
                                            <h2 className='textoInfoModal'>PROFESOR GUÍA: <p className='pl-2 font-normal'>{selectedDoc.teacher}</p> </h2>
                                            <h2 className='textoInfoModal'>AÑO: <p className='pl-2 font-normal'>{selectedDoc.year}</p> </h2>
                                            <h2 className='textoInfoModal'>CARRERA: <p className='pl-2 font-normal'>{selectedDoc.career}</p> </h2>
                                            <h2 className='textoInfoModal'>MODALIDAD: <p className='pl-2 font-normal'>{selectedDoc.mode}</p> </h2>
                                        </div> 
                                    </div>
                                    { (user.usertype === "admin") ? 
                                        (
                                            <div className='flex flex-row items-end justify-end mr-2 mb-3 mt-2'>
                                                <button onClick={() => openNewTab(selectedDoc.url)} className='botonModales'>Ver</button>
                                                <button onClick={() => saveDoc(selectedDoc.url, selectedDoc.title)} className='botonModales'>Descargar</button>
                                                <button onClick={() => updateConfirm(selectedDoc._id)} className='botonModales bg-yellow-600 hover:bg-yellow-500'>Modificar</button>
                                                <button onClick={() => {setShowDelete(true), setShowModal(false)}} className='botonModales bg-red-500 hover:bg-red-400'>Eliminar</button>
                                            </div>
                                        ) : (
                                            <div className='flex flex-row items-end justify-end mr-2 mb-3 mt-2'>
                                                <button className='botonModales'>Ver</button>
                                                <button className='botonModales'>Descargar</button>
                                            </div>
                                        )

                                    }
                                </div>
                            </div>
                        </div>
                        <div className='posicionContenedor'></div>  
                    </Modal>
                    )
                }
                { showDelete && selectedDoc &&
                   <Modal isOpen={showDelete} className='contenedorEliminar'>
                        <div className='contenedorEliminar'>
                            <div className='tamanoContenedorEliminar'>
                                <div className='bordeContenedorEliminar'>
                                    <div className='cabeceraContenedorEliminar'>
                                        <button className='btnX' onClick={() => setShowDelete(false)}> <span className='X'>x</span> </button>
                                    </div>
                                    <div className='cuerpoEliminar'>
                                        <img src={ALERTA} alt='Alerta' className='imagenAlerta' id='delImg'/>
                                        <h3 className='textoAlerta mb-8 pt-2 text-center' id='delTxt'> ¿Está seguro de eliminar el Documento?</h3>
                                    </div>
                                    <div className='flex flex-row items-end justify-end mr-2 mb-3 mt-2' id='delBtn'>
                                        <button onClick={() => {deleteDoc(selectedDoc._id), deleteConfirm(selectedDoc.url)}} className='botonModales bg-red-500 hover:bg-red-400'>Eliminar</button>
                                        <button onClick={() => setShowDelete(false)} className='botonModales'>Volver</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='posicionContenedor'></div>
                   </Modal>
                }
                </div>
                <div className="pagination flex justify-center mt-6">
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`mr-1 px-2 py-1 rounded-md border border-gray-400 ${currentPage === page ? 'bg-gray-300' : 'bg-white'}`}
                    >
                        {page}
                    </button>
                    ))}
                </div>
            </div>

            <Footer />
            
        </div>
    )
}

export default Home;
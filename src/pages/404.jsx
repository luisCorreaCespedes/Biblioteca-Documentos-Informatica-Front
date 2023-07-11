import { useNavigate } from 'react-router-dom';
import LOGO_UNIVERSIDAD from '../assets/logoUtem.png';
import Navbar from "../components/navbar";
import Footer from '../components/footer';

function NoEncontrado() {

    const navigate = useNavigate();

    function inicio() {
        navigate('/inicio');
    }

    return (
        <div>
            <Navbar />
                <div className='flex flex-col items-center justify-center pt-44'>
                    <img src={LOGO_UNIVERSIDAD} className='w-24' alt='Logo Universidad' />
                    <h1 className='pt-8 text-xl font-montserrat'>Ups! No hay nada para mostrar.</h1>
                    <button onClick={(e) => inicio()} className='pt-4 text-sm hover:font-semibold font-montserrat hover:text-[#2A3547]'>Volver al Inicio</button>
                </div>
            <Footer />
        </div>
    )
}

export default NoEncontrado;
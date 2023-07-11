import { useNavigate } from 'react-router-dom';
import IMAGEN from '../assets/escuela.jpg';
import Navbar from "../components/navbar";
import Footer from '../components/footer';

function Nosotros() {

    return (
        <div>
        <Navbar />
        <div className="flex flex-col lg:flex-row items-stretch lg:items-start lg:justify-center pt-20 pb-20 mx-10 lg:mx-16">
            <img
                src={IMAGEN}
                alt="Imagen de la Escuela de Informática"
                className="w-full lg:w-1/2 object-cover h-full lg:h-auto rounded-lg lg:order-1"
            />
            <div className="w-full lg:w-1/2 lg:order-2 pt-8 lg:pt-4 lg:pl-8 rounded-lg text-justify">
                <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800 font-montserrat">
                    Biblioteca Virtual de la Escuela de Informática
                </h2>
                <p className="text-md md:text-lg text-gray-700">
                    La Biblioteca Virtual de la Escuela de Informática de la Universidad Tecnológica Metropolitana de Chile tiene como objetivo principal
                    preservar de forma digital los Trabajos de Titulación de los estudiantes que pertenecen a las carreras de Ingeniería Civil en
                    Computación, Ingeniería en Informática e Ingeniería en Ciencia de Datos. Esta plataforma centraliza y organiza los Trabajos de
                    Titulación, proporcionando a los usuarios un acceso fácil y rápido a los documentos académicos. Cada trabajo de titulación incluye
                    información relevante como el año de desarrollo, el Profesor Guía y la modalidad de trabajo.
                </p>
            </div>
        </div>
        <Footer />
        </div>
    )
}

export default Nosotros;
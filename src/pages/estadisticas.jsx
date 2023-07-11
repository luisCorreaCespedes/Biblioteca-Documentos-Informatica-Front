import { useEffect } from 'react';
import { useDocs } from '../context/DocsContext';
import Navbar from "../components/navbar";
import Footer from '../components/footer';
import { Bar, Pie, Line, Bubble } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function Estadisticas() {
    
    const { docs, getDocs } = useDocs();

    useEffect(() => {
        getDocs();
    }, []);

    const generarDatosGraficoModalidad = () => {
        const modalidades = {};
        docs.forEach((doc) => {
            const modalidad = doc.mode;
            if (modalidades[modalidad]) modalidades[modalidad]++;
            else modalidades[modalidad] = 1;
        });
        const datos = {
            labels: Object.keys(modalidades),
            datasets: [
                {
                    label: 'Cantidad de Documentos',
                    data: Object.values(modalidades),
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
        };
        return datos;
    };

    const generarDatosGraficoCarrera = () => {
        const carreras = {};
        docs.forEach((doc) => {
            const carrera = doc.career;
            if (carreras[carrera]) carreras[carrera]++;
            else carreras[carrera] = 1;
        });
        const datos = {
            labels: Object.keys(carreras),
            datasets: [
                {
                label: 'Cantidad de Documentos',
                data: Object.values(carreras),
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 205, 86, 0.6)',
                    // Agregar más colores aquí para cada categoría
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 205, 86, 1)',
                    // Agregar más colores aquí para cada categoría
                ],
                borderWidth: 1,
                },
            ],
        };
        return datos;
    };

    const generarDatosGraficoAnio = () => {
        const documentosPorAnio = {};
        docs.forEach((doc) => {
            const anio = doc.year;
            if (documentosPorAnio[anio]) documentosPorAnio[anio]++;
            else documentosPorAnio[anio] = 1;
        });
        const datos = {
            labels: Object.keys(documentosPorAnio),
            datasets: [
                {
                    label: 'Cantidad de Documentos',
                    data: Object.values(documentosPorAnio),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1,
                },
            ],
        };
        return datos;
    };
    
    const generarDatosGraficoModalidadCarrera = () => {
        const datos = {
            labels: [],
            datasets: [],
        };
        const modalidades = {};
        const carreras = {};
        docs.forEach((doc) => {
            const modalidad = doc.mode;
            const carrera = doc.career;
            if (!modalidades[modalidad]) {
                modalidades[modalidad] = {};
            }
            if (!modalidades[modalidad][carrera]) {
                modalidades[modalidad][carrera] = 1;
            } else {
                modalidades[modalidad][carrera]++;
            }
            if (!carreras[carrera]) {
                carreras[carrera] = {};
            }
            if (!carreras[carrera][modalidad]) {
                carreras[carrera][modalidad] = 1;
            } else {
                carreras[carrera][modalidad]++;
            }
        });
        datos.labels = Object.keys(modalidades);
        Object.keys(carreras).forEach((carrera, index) => {
            const data = Object.values(modalidades).map((modalidad) =>
            modalidad[carrera] ? modalidad[carrera] : 0
            );
            datos.datasets.push({
                label: carrera,
                data: data,
                backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
                Math.random() * 256
                )}, ${Math.floor(Math.random() * 256)}, 0.6)`,
                borderColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
                    Math.random() * 256
                    )}, ${Math.floor(Math.random() * 256)}, 1)`,
                    borderWidth: 1,
                });
        });
        return datos;
    };
    
    const generarDatosGraficoAnioModalidad = () => {
        const datos = {
            labels: [],
          datasets: [],
        };
        
        const anios = {}; // Crear objeto para almacenar los años
        const modalidades = {}; // Crear objeto para almacenar las modalidades
        
        docs.forEach((doc) => {
            const anio = doc.year;
            const modalidad = doc.mode;
            
            if (!anios[anio]) {
            anios[anio] = {};
        }
      
        if (!anios[anio][modalidad]) {
            anios[anio][modalidad] = 1;
          } else {
            anios[anio][modalidad]++;
          }
      
          if (!modalidades[modalidad]) {
            modalidades[modalidad] = {};
          }
          
          if (!modalidades[modalidad][anio]) {
            modalidades[modalidad][anio] = 1;
        } else {
            modalidades[modalidad][anio]++;
        }
        });
        
        // Generar las etiquetas (labels) y los datasets para el gráfico
        datos.labels = Object.keys(anios);
        Object.keys(modalidades).forEach((modalidad, index) => {
            const data = Object.values(anios).map((anio) =>
            anio[modalidad] ? anio[modalidad] : 0
            );
            
            datos.datasets.push({
                label: modalidad,
            data: data,
            backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
                Math.random() * 256
                )}, ${Math.floor(Math.random() * 256)}, 0.6)`,
            borderColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
                Math.random() * 256
                )}, ${Math.floor(Math.random() * 256)}, 1)`,
                borderWidth: 1,
            });
        });
        
        return datos;
    };
    
    const generarDatosGraficoModalidadProfesor = () => {
        const datos = {
          labels: obtenerProfesoresUnicos(),
          datasets: [],
        };
    
        const modalidadesUnicas = obtenerModalidadesUnicas();
    
        modalidadesUnicas.forEach((modalidad) => {
          const cantidadDocumentosPorProfesor = obtenerCantidadDocumentosPorModalidadProfesor(modalidad);
          const datosBarra = {
            label: modalidad,
            data: cantidadDocumentosPorProfesor,
            backgroundColor: generarColorAleatorio(),
            borderWidth: 1,
          };
    
          datos.datasets.push(datosBarra);
        });
    
        return datos;
    };
    
    const obtenerProfesoresUnicos = () => {
    const profesoresUnicos = new Set();
    docs.forEach((doc) => {
        profesoresUnicos.add(doc.teacher);
    });
    return Array.from(profesoresUnicos);
    };
    
    const obtenerModalidadesUnicas = () => {
    const modalidadesUnicas = new Set();
    docs.forEach((doc) => {
        modalidadesUnicas.add(doc.mode);
    });
    return Array.from(modalidadesUnicas);
    };
    
    const obtenerCantidadDocumentosPorModalidadProfesor = (modalidad) => {
    const cantidadDocumentosPorProfesor = [];
    obtenerProfesoresUnicos().forEach((profesor) => {
        const cantidad = docs.filter((doc) => doc.mode === modalidad && doc.teacher === profesor).length;
        cantidadDocumentosPorProfesor.push(cantidad);
    });
    return cantidadDocumentosPorProfesor;
    };
    
    const generarColorAleatorio = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 0.6)`;
    };
    
    const optionsModalidad = {
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Cantidad de Documentos por Modalidad',
            },
        },
        responsive: true,
        scales: {
            x: {
                display: true,
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    const optionsCarrera = {
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Cantidad de Documentos por Carrera',
            },
        },
        responsive: true,
    };

    const optionsAnio = {
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Cantidad de Documentos por Año',
            },
        },
        responsive: true,
        scales: {
            x: {
                display: true,
                title: {
                display: true,
                text: 'Año',
                },
            },
            y: {
                beginAtZero: true,
                display: true,
                title: {
                display: true,
                text: 'Cantidad',
                },
            },
        },
    };

    const optionsModalidadCarrera = {
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Cantidad de Documentos por Modalidad y Carrera',
          },
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
            beginAtZero: true,
          },
        },
    };

    const optionsAnioModalidad = {
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Cantidad de Documentos por Año y Modalidad',
          },
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
            title: {
              display: true,
              text: 'Año',
            },
          },
          y: {
            stacked: true,
            beginAtZero: true,
            title: {
              display: true,
              text: 'Cantidad',
            },
          },
        },
    };

    const optionsModalidadProfesor = {
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Cantidad de Documentos por Modalidad de cada Profesor',
          },
        },
        responsive: true,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Profesor',
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Cantidad de Documentos',
            },
            beginAtZero: true,
          },
        },
    };

    const datosGraficoModalidad = generarDatosGraficoModalidad();
    const datosGraficoCarrera = generarDatosGraficoCarrera();
    const datosGraficoAnio = generarDatosGraficoAnio();
    const datosGraficoModalidadCarrera = generarDatosGraficoModalidadCarrera();
    const datosGraficoAnioModalidad = generarDatosGraficoAnioModalidad();
    const datosGraficoModalidadProfesor = generarDatosGraficoModalidadProfesor();
   
  if (docs.length === 0) {
    return (
      <div>
        <Navbar />
        <div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className='pt-20 pb-16 mx-8 sm:mx-12 md:mx-16'>

        <div className="flex flex-row justify-center pb-2">
            <div className='pb-6 flex-col'>
                <h3 className='text-xl font-montserrat leading-tight font-semibold'>Estadísticas Generales</h3>
                <hr className='border-gray-400 border leading-tight w-full' />
            </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
            <div className='bg-white p-4 mx-2 border border-gray-400 rounded-lg h-72'>
                <Bar data={datosGraficoModalidad} options={optionsModalidad} />
            </div>
            <div className='bg-white p-4 mx-2 border border-gray-400 rounded-lg h-72'>
                <Pie data={datosGraficoCarrera} options={optionsCarrera} />
            </div>
            <div className='bg-white p-4 mx-2 border border-gray-400 rounded-lg h-72'>
                <Line data={datosGraficoAnio} options={optionsAnio} />
            </div>
            <div className='bg-white p-4 mx-2 border border-gray-400 rounded-lg h-72'>
                <Bar data={datosGraficoModalidadCarrera} options={optionsModalidadCarrera} />
            </div>
            <div className='bg-white p-4 mx-2 border border-gray-400 rounded-lg h-72'>
                <Bar data={datosGraficoAnioModalidad} options={optionsAnioModalidad} />
            </div>
            <div className='bg-white p-4 mx-2 border border-gray-400 rounded-lg h-72'>
                <Bar data={datosGraficoModalidadProfesor} options={optionsModalidadProfesor} />
            </div>
            
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Estadisticas;
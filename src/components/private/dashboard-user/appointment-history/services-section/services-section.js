import { appointmentHistory, scheduleAppointment, searchDoctor } from '../../../common/services-clinic';
import './services-section.css';

const servicesSection = ({id, nombre, apellido, img}) => {
    // Aqui se obtienen los elementos
    const agendarCita = scheduleAppointment({id, nombre, apellido, img});
    const historialCitas = appointmentHistory();
    const buscarMedico = searchDoctor();

    const section = document.createElement('section');
    section.id = 'servicios';
    section.className = 'col col-lg-3 col-ms-12 ';

    // Crear los contenedores para cada elemento
    const agendarCitaContainer = document.createElement('div');
    agendarCitaContainer.className = 'col-md-12 mb-3 icons icon d-flex flex-column justify-content-center';
    agendarCitaContainer.appendChild(agendarCita);

    const historialCitasContainer = document.createElement('div');
    historialCitasContainer.className = 'col-md-12 mb-3 icons d-flex flex-column justify-content-center';
    historialCitasContainer.appendChild(historialCitas);

    const buscarMedicoContainer = document.createElement('div');
    buscarMedicoContainer.className = 'col-md-12 icons d-flex flex-column justify-content-center';
    buscarMedicoContainer.appendChild(buscarMedico);

    // Crear el contenedor principal
    const mainContainer = document.createElement('div');
    mainContainer.className = 'row d-flex justify-content-center align-items-center text-center';
    mainContainer.innerHTML = '<h3 class="mt-3">Nuestros servicios</h3>';
    mainContainer.appendChild(agendarCitaContainer);
    mainContainer.appendChild(historialCitasContainer);
    mainContainer.appendChild(buscarMedicoContainer);

    // Agregar el contenedor principal a la sección
    section.appendChild(mainContainer);

    return section;
};

export default servicesSection;

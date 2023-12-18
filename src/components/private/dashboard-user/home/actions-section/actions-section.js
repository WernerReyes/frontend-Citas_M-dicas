import { appointmentHistory, scheduleAppointment, searchDoctor } from '../../../common/services-clinic';
import  './actions-section.css';

const actionsSection = ({id, nombre, apellido, img}) => {
    // Aqui se obtienen los elementos
    const agendarCita = scheduleAppointment({id, nombre, apellido, img});
    const historialCitas = appointmentHistory();
    const buscarMedico = searchDoctor();

    const section = document.createElement('section');
    section.id = 'procesos-realizar';
    section.className = 'container p-4';

    const row = document.createElement('div');
    row.className = 'row p-4 d-flex justify-content-center align-items-center';

    const welcomeDiv = document.createElement('div');
    welcomeDiv.className = 'col-lg-4  col-sm-12';
    welcomeDiv.innerHTML = `<h1><strong id="dato">Hola ${nombre.toUpperCase()} ${apellido.toUpperCase()},</strong> Bienvenido a tu clinica</h1>`;

    const linksDiv = document.createElement('div');
    linksDiv.className = 'col-lg-8  col-sm-12 links-datos-realizar';

    const linksRow = document.createElement('div');
    linksRow.className = 'row d-flex justify-content-evenly align-items-center text-center ';

    const agendarCitaDiv = document.createElement('div');
    agendarCitaDiv.className = 'col-md-6 col-lg-4';
    agendarCitaDiv.appendChild(agendarCita);

    const historialCitasDiv = document.createElement('div');
    historialCitasDiv.className = 'col-md-6 col-lg-4';
    historialCitasDiv.appendChild(historialCitas);

    const buscarMedicoDiv = document.createElement('div');
    buscarMedicoDiv.className = 'col-md-12 col-lg-4';
    buscarMedicoDiv.appendChild(buscarMedico);

    linksRow.appendChild(agendarCitaDiv);
    linksRow.appendChild(historialCitasDiv);
    linksRow.appendChild(buscarMedicoDiv);

    linksDiv.appendChild(linksRow);

    row.appendChild(welcomeDiv);
    row.appendChild(linksDiv);

    section.appendChild(row);

    return section;
};

export default actionsSection;


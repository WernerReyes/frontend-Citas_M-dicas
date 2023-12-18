import URLS_APP from '../../../../../urls-app';
import { appointmentHistory, searchDoctor } from '../../../common/services-clinic';
import  './actions-section.css';

const actionsSectionMedical = ({id, nombre, apellido, img}) => {
  
    const historialCitas = appointmentHistory();
    historialCitas.children[0].href = URLS_APP.APPOINTMENT_HISTORY_DASHBOARD_MEDICAL;

    const revisarCitasPendientes = searchDoctor();
    const ancla = revisarCitasPendientes.children[0]
    ancla.href = URLS_APP.PROFILE_DASHBOARD_MEDICAL;
    ancla.children[1].textContent = 'Ver mi perfil';
    
    const section = document.createElement('section');
    section.id = 'procesos-realizar';
    section.className = 'container p-4';

    const row = document.createElement('div');
    row.className = 'row p-4 d-flex justify-content-center align-items-center';

    const welcomeDiv = document.createElement('div');
    welcomeDiv.className = 'col-lg-4  col-sm-12';
    welcomeDiv.innerHTML = `<h1><strong id="dato">Hola Dr. ${nombre.toUpperCase()} ${apellido.toUpperCase()}, </strong> Bienvenido al panel de doctores</h1>`;

    const linksDiv = document.createElement('div');
    linksDiv.className = 'col-lg-8  col-sm-12 links-datos-realizar';

    const linksRow = document.createElement('div');
    linksRow.className = 'row d-flex justify-content-evenly align-items-center text-center ';

    const historialCitasDiv = document.createElement('div');
    historialCitasDiv.className = 'col-lg-6';
    historialCitasDiv.appendChild(historialCitas);

    const buscarMedicoDiv = document.createElement('div');
    buscarMedicoDiv.className = 'col-lg-6';
    buscarMedicoDiv.appendChild(revisarCitasPendientes);

    // linksRow.appendChild(agendarCitaDiv);
    linksRow.appendChild(historialCitasDiv);
    linksRow.appendChild(buscarMedicoDiv);

    linksDiv.appendChild(linksRow);

    row.appendChild(welcomeDiv);
    row.appendChild(linksDiv);

    section.appendChild(row);

    return section;
};

export default actionsSectionMedical;


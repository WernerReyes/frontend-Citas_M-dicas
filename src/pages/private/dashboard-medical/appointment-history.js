import { modalBase, spinnerCarga, topBar } from "../../../components/common";
import { appointmentsSectionMedical, footerPrivate, headerPrivate, sidebarPrivate } from "../../../components/private";
import { verifyTokenUtil } from "../../../utils/verifyToken";

const appointmentHistoryMedicalPage = async (container) => {
    container.className = 'min-vh-100 d-flex flex-column justify-content-between';
    if (document.getElementById('main-app-history-medical')) return;
    try {
        // Verify token and get user data
        const doctor = await verifyTokenUtil();

        // Create the topbar, header and sidebar components
        const topbar = topBar();
        const header = headerPrivate();
        const sidebar = sidebarPrivate(doctor);


        // <--! Content -->

        const main = document.createElement('main');
        main.id = 'main-app-history-medical';
        main.style.marginTop = '7rem';

        const divButtons = document.createElement('div');
        divButtons.className = 'd-flex justify-content-center align-items-center p-4';
        // const 
        const buttonCitasProgramadas = buttonCitas()
        const buttonCitasHistorial = buttonHistorial();
        const scheduledAppoint = await appointmentsSectionMedical({ doctorId: doctor.id, estadoMedico: 'proceso' }, 'scheduledAppoint');

        buttonCitasProgramadas.onclick = async () => {
            verifyClass(buttonCitasProgramadas);
            verifyClass(buttonCitasHistorial);

            const scheduledAppointEvent = await appointmentsSectionMedical({ doctorId: doctor.id, estadoMedico: 'proceso' }, 'scheduledAppoint');
            main.querySelector('#citas-pendientes').remove();
            main.appendChild(scheduledAppointEvent);
        }

        buttonCitasHistorial.onclick = async () => {
            verifyClass(buttonCitasProgramadas);
            verifyClass(buttonCitasHistorial);

            const historyAppointEvent = await appointmentsSectionMedical({ doctorId: doctor.id, estadoMedico: 'Cita completada' }, 'historyAppoint');
            main.querySelector('#citas-pendientes').remove();
            main.appendChild(historyAppointEvent);
        }

        divButtons.appendChild(buttonCitasProgramadas);
        divButtons.appendChild(buttonCitasHistorial);
        main.appendChild(divButtons);
        main.appendChild(scheduledAppoint);

        // --> Content <--

        // Create the footer component
        const footer = footerPrivate();

        // Create the modal component
        const modal = modalBase('agendar-cita-modal');

        // Create the spinner component
        const spinner = spinnerCarga();


        // Create a document fragment
        const fragment = document.createDocumentFragment();
        fragment.appendChild(topbar);
        fragment.appendChild(header);
        fragment.appendChild(sidebar);
        fragment.appendChild(main);
        fragment.appendChild(footer);
        fragment.appendChild(modal);
        fragment.appendChild(spinner);

        // Add fragment to container
        container.appendChild(fragment);

        // Load scripts
        // container.appendChild(mainScript());
    } catch (error) {
        throw error;
    }

};

export default appointmentHistoryMedicalPage;

const buttonCitas = () => {
    const buttonCitasProgramadas = document.createElement('button');
    buttonCitasProgramadas.className = 'btn btn-primary me-3 border-0 active';
    buttonCitasProgramadas.style.backgroundColor = '#1c4ca5';
    buttonCitasProgramadas.textContent = 'Citas Programadas';
    return buttonCitasProgramadas;
}

const buttonHistorial = () => {
    const buttonCitasHistorial = document.createElement('button');
    buttonCitasHistorial.className = 'btn btn-primary ms-3 border-2';
    buttonCitasHistorial.style.borderColor = '#1c4ca5';
    buttonCitasHistorial.style.backgroundColor = 'transparent';
    buttonCitasHistorial.style.color = 'black';
    buttonCitasHistorial.textContent = 'Historial de Citas';
    return buttonCitasHistorial;
}

const verifyClass = (button) => {
   if(button.classList.contains('active')) {
    button.className = 'btn btn-primary ms-3 border-2';
    button.style.borderColor = '#1c4ca5';
    button.style.backgroundColor = 'transparent';
    button.style.color = 'black';
   }  else {
    button.className = 'btn btn-primary ms-3 border-0 active';
    button.style.backgroundColor = '#1c4ca5';
    button.style.color = 'white';
   }
};
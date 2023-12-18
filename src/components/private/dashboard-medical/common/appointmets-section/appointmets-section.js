import { completeAppointment, getMedicalAppointment, getMedicalAppointments } from "../../../../../services/api/appointment";
import { updateModalContent } from "../../../../common";
import { showConfirmAlertComplete } from "../../../../common/alerts/alerts";

const appointmentsSectionMedical = async (params, sectionPage) => {

    try {
        // Get appointments from API
        const appointments = await getMedicalAppointments(params);

        // Create section
        const section = document.createElement('section');
        section.className = 'container';
        section.id = 'citas-pendientes';

        if (appointments.length) {

            const row = document.createElement('div');
            row.classList.add('row');

            const divTitle = document.createElement('div');
            divTitle.classList.add('col-12', 'mb-3');
            divTitle.innerHTML = `
                <h2 class="text-center"><strong>${titleSection(sectionPage)}</strong></h2>
            `;

            row.appendChild(divTitle);

            appointments.forEach(appointment => {

                const { id, patient: { nombre: nombrePaciente, apellido: apellidoPaciente }, estado_medico } = appointment;
                const { schedule: { fecha, hora_inicio, hora_fin } } = appointment;

                const divAppointment = document.createElement('div');
                divAppointment.id = `cita-${id}`;
                divAppointment.classList.add('col-lg-4', 'col-md-9', 'col-sm-12', 'mb-3', 'citaHist');

                const card = document.createElement('div');
                card.classList.add('card', 'p-3');

                const title = document.createElement('h5');
                title.classList.add('card-title', 'mb-4');
                title.innerHTML = `<strong>Cita Médica</strong>`;

                const patient = document.createElement('p');
                patient.classList.add('card-text', 'mb-2');
                patient.innerHTML = `<strong>Paciente:</strong> ${nombrePaciente} ${apellidoPaciente}`;

                const status = document.createElement('p');
                status.classList.add('card-text', 'mb-2', `${estado_medico === 'proceso' ? 'text-warning' : 'text-success'}`);
                status.innerHTML = `<strong>Estado:</strong> ************ ${estado_medico.toUpperCase()} ************`;

                const date = document.createElement('p');
                date.classList.add('card-text', 'mb-3');
                date.innerHTML = `<strong>Fecha y Hora:</strong> ${fecha} / ${hora_inicio} - ${hora_fin}`;


                const divButtons = document.createElement('div');
                divButtons.className = 'd-flex justify-content-center align-items-center';

                const button = document.createElement('button');
                button.classList.add('btn', 'btn-primary', 'border-0');
                button.style.backgroundColor = '#1c4ca5';
                button.textContent = 'Ver más información de la cita';
                button.onclick = () => appointmentDetailModal(id);
                divButtons.appendChild(button);

                if (sectionPage !== 'historyAppoint') {
                    const buttonCompleteAppoint = document.createElement('button');
                    buttonCompleteAppoint.classList.add('btn', 'btn-primary', 'ms-3', 'border-0');
                    buttonCompleteAppoint.style.backgroundColor = '#1c4ca5';
                    buttonCompleteAppoint.textContent = 'Completar cita';
                    buttonCompleteAppoint.onclick = async () => {
                        const confirm = await showConfirmAlertComplete({ icon: 'warning' });
                        if (confirm) {
                            await completeAppointment(id);

                            const divAppointment = document.getElementById(`cita-${id}`);
                            divAppointment.remove();

                        }
                    };
                    divButtons.appendChild(buttonCompleteAppoint);
                }

                card.appendChild(title);
                card.appendChild(patient);
                card.appendChild(status);
                card.appendChild(date);
                card.appendChild(divButtons);

                divAppointment.appendChild(card);

                row.appendChild(divAppointment);

            });

            section.appendChild(row);

        }
        else {
            section.innerHTML = `
        <div class="row">
         <div class="col-12 mb-3">
            <h2 class="text-center"><strong> ${sectionPage === 'historyAppoint' ? 'No hay citas en el historial' : 'No hay citas pendientes'} </strong></h2>
            </div> 
        </div>
        `;
        }


        return section;
    } catch (error) {
        console.log(error);
    }
};

export default appointmentsSectionMedical;


// ----> Modals <----
// Ver detalle de la cita
const appointmentDetailModal = async (idCita) => {
    try {
        const modal = new bootstrap.Modal(document.getElementById('agendar-cita-modal'));

        // Get appointment data from API
        const { sede, patient: { img: imgPatient, nombre: nombrePaciente, apellido: apellidoPaciente }, schedule, estado_medico } = await getMedicalAppointment(idCita);
        const { fecha, hora_inicio, hora_fin } = schedule;

        const modalTitleContainer = document.createElement('div');
        modalTitleContainer.className = 'modal-title-container d-flex justify-content-center align-items-center';
        const title = document.createElement('h5');
        title.className = 'modal-title-text text-info text-center fw-bold';
        title.textContent = 'CITA PROGRAMADA';
        modalTitleContainer.appendChild(title);

        const contentBody = document.createElement('div');
        contentBody.classList.add('row');
        contentBody.innerHTML = `
            <div class="d-flex">
                <div class="imageCita" style="width: 200px; height: 200px; overflow: hidden; border: 2px solid; border-radius: 50%;">
                    <img src="${imgPatient || '/assets/img/sin-perfil.jpg'}" alt="Imagen de perfil" class="imagen img-fluid rounded-circle object-fit-fill w-100 h-100">
                </div>
                <div class="contenidoDetalle">
                    <p>Paciente: ${nombrePaciente} ${apellidoPaciente}</p>
                    <p>Consultorio 201-${sede}</p>
                    <p>Fecha: ${fecha}</p>
                    <p>Hora: ${hora_inicio} - ${hora_fin}</p>
                    <p>Estado: ${estado_medico.toUpperCase()}</p>
                </div>
            </div>
        `;

        updateModalContent('agendar-cita-modal', modalTitleContainer, contentBody);

        modal.show();
    } catch (error) {
        console.log(error);
    }
};



// ----> Utils <----

const titleSection = (sectionPage) => {
    switch (sectionPage) {
        case 'scheduledAppoint':
            return 'Citas Programadas';
        case 'historyAppoint':
            return 'Historial de Citas';
        default:
            return 'Citas Médicas';
    }
}
import './appointmets-section.css';
import validations from '../../../../../validations-inputs';

import { deleteMedicalAppointment, getMedicalAppointment, getMedicalAppointments } from '../../../../../services/api/appointment';
import { createInput, createSubmitInput, updateModalContent } from '../../../../common';
import { showAlert, showConfirmAlert } from '../../../../common/alerts/alerts';
import { modalChooseProfile } from '../../../common/services-clinic/schedule-appointment';
import { validateInputs } from '../../../../../utils/validations';
import { createPayment } from '../../../../../services/api/payment';

const appointmentsSection = async ({ id }) => {
    const section = document.createElement('section');
    section.id = 'citas-medicas';
    section.className = 'container p-4';

    const row = document.createElement('div');
    row.className = 'row';

    try {
        // Get medical appointments from API
        const medicalAppointments = await getMedicalAppointments({ userId: id, estado: 'pendiente' });

        if (medicalAppointments.length) {
            medicalAppointments.forEach(appointment => {
                const container = createAppointmentCard(appointment);
                row.appendChild(container);
            });

            section.appendChild(row);
        }

        return section;
    } catch (error) {
        console.log(error);
    }
};

export default appointmentsSection;

export const createAppointmentCard = (appointment) => {
    const { id: idCita, doctor, patient, estado, schedule_id, schedule } = appointment;
    const { id: idPaciente, img: imgPaciente, nombre: nombrePaciente, apellido: apellidoPaciente } = patient;
    const { nombre: nombreDoctor, apellido: apellidoDoctor, specialy: { nombre: nombreEspecialidad } } = doctor;
    const container = document.createElement('div');
    container.id = `appointment-${idCita}`;
    container.className = 'col-lg-4 col-md-6 col-sm-12 p-3 mb-4';

    const card = document.createElement('div');
    card.className = 'card p-3 mb-4';

    const doctorName = document.createElement('p');
    doctorName.className = 'mb-0 mt-3';
    doctorName.innerHTML = `<strong>Dr.</strong> ${nombreDoctor} ${apellidoDoctor}`;
    card.appendChild(doctorName);

    const specialty = document.createElement('p');
    specialty.className = 'mb-0';
    specialty.innerHTML = `<strong>Especialidad:</strong> ${nombreEspecialidad}`;
    card.appendChild(specialty);

    const patientName = document.createElement('p');
    patientName.className = 'mb-0';
    patientName.innerHTML = `<strong>Paciente: </strong>${nombrePaciente} ${apellidoPaciente}`;
    card.appendChild(patientName);

    const paymentStatus = document.createElement('p');
    paymentStatus.className = 'text-danger';
    paymentStatus.style.fontSize = '13px';
    paymentStatus.textContent = `Estado de pago: xxxxxxx ${estado.toUpperCase()} xxxxxxx`;
    card.appendChild(paymentStatus);

    const hr1 = document.createElement('hr');
    hr1.className = 'mb-1 mt-0';
    card.appendChild(hr1);

    const actionsContainer = document.createElement('div');
    actionsContainer.className = 'd-flex justify-content-around';

    // Cancel appointment
    const cancelLink = document.createElement('a');
    cancelLink.style.cursor = 'pointer';
    cancelLink.dataset.id = idCita;
    cancelLink.dataset.horario = schedule_id;
    cancelLink.innerHTML = `<i class="bi bi-file-excel-fill text-danger" data-id="${idCita}"></i> Cancelar`;
    cancelLink.onclick = async (e) => {  // Delete appointment
        const idCita = e.target.dataset.id;
        const idHorario = e.target.dataset.horario;
        console.log(idCita, idHorario);
        const exito = await showConfirmAlert({ icon: 'warning' })
        if (exito) {
            try {
                await deleteMedicalAppointment(idCita, idHorario);

                // Eliminar la tarjeta de la cita del DOM
                const appointmentCard = document.getElementById(`appointment-${idCita}`);
                appointmentCard.remove();
            } catch (error) {
                console.log(error);
            }
        }
    };
    actionsContainer.appendChild(cancelLink);

    const rescheduleLink = document.createElement('a');
    rescheduleLink.href = '#';
    rescheduleLink.innerHTML = '<i class="bi bi-calendar4-week"></i> Reprogramar';
    rescheduleLink.dataset.id = idCita;
    rescheduleLink.onclick = (e) => { // Edit appointment
        const idCita = e.target.dataset.id;
        modalChooseProfile({ id: idPaciente, nombre: nombrePaciente, apellido: apellidoPaciente, img: imgPaciente, idCita }) ;
    };

    actionsContainer.appendChild(rescheduleLink);

    const payLink = document.createElement('a');
    payLink.href = '#';
    payLink.innerHTML = `<i data-id="${idCita}" class="bi bi-file-earmark-check-fill text-success"></i> Pagar`;
    payLink.dataset.id = idCita;
    payLink.onclick = (e) => { // Pay appointment
        const idCita = e.target.dataset.id;
        payAppointmentModal({idCita, idPaciente, ...schedule });
    };
    actionsContainer.appendChild(payLink);

    card.appendChild(actionsContainer);

    const hr2 = document.createElement('hr');
    hr2.className = 'mt-1';
    card.appendChild(hr2);

    const detailsButtonContainer = document.createElement('div');
    detailsButtonContainer.className = 'text-center';

    // Show detail of the appointment
    const detailsButton = document.createElement('button');
    detailsButton.type = 'submit';
    detailsButton.className = 'btn btn-outline-primary';
    detailsButton.textContent = 'VER DETALLES DE LA CITA';
    detailsButton.dataset.id = idCita;
    detailsButton.onclick = (e) => {
        const idCita = e.target.dataset.id;
        appointmentDetailModal(idCita); // Show modal with appointment details
    }
    detailsButtonContainer.appendChild(detailsButton);
    card.appendChild(detailsButtonContainer);

    container.appendChild(card);

    return container;
};

// <-- MODALS -->

// Ver detalle de la cita
const appointmentDetailModal = async (idCita) => {
    try {
        const modal = new bootstrap.Modal(document.getElementById('agendar-cita-modal'));

        // Get appointment data from API
        const { sede, doctor, patient: { nombre: nombrePaciente, apellido: apellidoPaciente }, schedule } = await getMedicalAppointment(idCita);
        const { nombre: nombreDoctor, apellido: apellidoDoctor, img: imgDoctor, specialy: { nombre: nombreEspecialidad } } = doctor;
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
                    <img src="${imgDoctor || '/assets/img/UserImages/app-logo3.png'}" alt="Imagen de perfil" class="imagen img-fluid rounded-circle object-fit-fill w-100 h-100">
                </div>
                <div class="contenidoDetalle">
                    <p>Dr. ${nombreDoctor} ${apellidoDoctor}</p>
                    <p>Especialidad: ${nombreEspecialidad}</p>
                    <p>Paciente: ${nombrePaciente} ${apellidoPaciente}</p>
                    <p>Consultorio 201-${sede}</p>
                    <p>Fecha: ${fecha}</p>
                    <p>Hora: ${hora_inicio} - ${hora_fin}</p>
                </div>
            </div>
        `;

        updateModalContent('agendar-cita-modal', modalTitleContainer, contentBody);

        modal.show();
    } catch (error) {
        console.log(error);
    }
};

// Pagar la cita
const typesOfPayment = [
    { name: 'BCP' },
    { name: 'Interkbank' },
    { name: 'Banco de la Nación' },
];

const payAppointmentModal = async ({ idCita, idPaciente, hora_fin, hora_inicio }) => {
    const modal = new bootstrap.Modal(document.getElementById('agendar-cita-modal'));

    // <-- VALIDATIONS -->
    const { cardPassword, cardNumber } = validations;

    const data = {
        tipo_pago: '',
        medical_appointment_id: idCita,
        user_id: idPaciente,
        rate_appointment_id: 1,
    }

    // Calcular la duración de la cita
    const start = new Date(`1970-01-01T${hora_inicio}Z`);
    const end = new Date(`1970-01-01T${hora_fin}Z`);
    const duration = (end - start) / (1000 * 60); // duración en minutos

    // Determinar el costo en función de la duración
    let cost;
    if (duration >= 60) {
        cost = 100;
        data.rate_appointment_id = 3;
    } else if (duration >= 45) {
        cost = 70;
        data.rate_appointment_id = 2;
    } else {
        cost = 50;
    }

    const modalTitleContainer = document.createElement('div');
    modalTitleContainer.className = 'modal-title-container d-flex justify-content-center align-items-center';
    const title = document.createElement('h5');
    title.className = 'modal-title-text text-info text-center fw-bold';
    title.textContent = 'PAGAR CITA';
    modalTitleContainer.appendChild(title);

    const contentBody = document.createElement('div');
    contentBody.classList.add('container', 'contenedor','p-4','overflow-auto','mb-4');


    const form = document.createElement('form');
    form.id = 'form-pago';
    form.className= 'd-flex flex-column justify-content-center align-items-center';
    form.onsubmit = async (e) => {
        e.preventDefault();
        try {
            // Enviar data al servidor
            const message = await createPayment(data);

            // Volvemos a cargar las citas médicas
            const appointments = document.getElementById(`appointment-${idCita}`);
            appointments.remove();

            // Mostrar mensaje de éxito
            showAlert({ icon: 'success', title:message });

            // Cerrar modal
            modal.hide();
        } catch (error) {
            console.log(error);
        }
    };

    const row1 = document.createElement('div');
    row1.className = 'row mb-3';

    const col1 = document.createElement('div');
    col1.className = 'col-md-6';

    const input1 = document.createElement('input');
    input1.type = 'text';
    input1.className = 'form-control';
    input1.value = `Monto: S/. ${cost}.00`;
    input1.disabled = true;

    col1.appendChild(input1);
    row1.appendChild(col1);

    const col2 = document.createElement('div');
    col2.className = 'col-md-6';

    const select = document.createElement('select');
    select.className = 'form-select';

    // Crear la imagen fuera del evento onchange y agregarla al formulario
    const imgPayment = document.createElement('img');
    imgPayment.classList.add('img-fluid', 'img-payment','text-center','mx-auto','mb-3');
    imgPayment.style.display = 'none';
    imgPayment.style.boxShadow = '0px 0px 10px 0px rgba(0,0,0,0.75)';
    imgPayment.width = 160;
    imgPayment.alt = 'payment';
    form.appendChild(imgPayment);

    select.onchange = (e) => {
        const value = e.target.value;
        if (value === 'Tipo de tarjeta') {
            imgPayment.style.display = 'none';
            return;
        }

        data.tipo_pago = value;

        // Dentro del evento onchange, cambiar el src de la imagen
        imgPayment.src = `/assets/img/UserImages/${value}.png`;
        imgPayment.style.display = 'block';
    };

    const option1 = document.createElement('option');
    option1.selected = true;
    option1.textContent = 'Tipo de tarjeta';
    select.appendChild(option1);

    typesOfPayment.forEach(type => {
        const option = document.createElement('option');
        option.value = type.name;
        option.textContent = type.name;
        select.appendChild(option);
    });
    
    col2.appendChild(select);
    row1.appendChild(col2);

    form.appendChild(row1);

    const row2 = document.createElement('div');
    row2.className = 'row mb-3';

    const col3 = document.createElement('div');
    col3.className = 'col-md-6';

    const userCardNumberInput = createInput({ id: 'cardNumber', placeholder: 'Tu número de tarjeta', validations: cardNumber });
    col3.appendChild(userCardNumberInput);
    row2.appendChild(col3);

    const col4 = document.createElement('div');
    col4.className = 'col-md-6';

    const userPasswordInput = createInput({ id: 'password', placeholder: 'Tu contraseña', validations: cardPassword, classes: null, type: 'password' });

    col4.appendChild(userPasswordInput);
    row2.appendChild(col4);

    form.appendChild(row2);

    const dGrid = document.createElement('div');
    dGrid.className = 'd-grid';

    // Create button
    const button = createSubmitInput({ value: 'Confirmar Pago', divClasses: 'text-center', disabled: true });

    dGrid.appendChild(button);
    form.appendChild(dGrid);

    // Validate all inputs to enable button
    let inputs = Array.from(form.querySelectorAll('input[type="text"], input[type="password"], select'));
    validateInputs(inputs, button.children[0]);

    contentBody.appendChild(form);
    updateModalContent('agendar-cita-modal', modalTitleContainer, contentBody);

    modal.show();
};


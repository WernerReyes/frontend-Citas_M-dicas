import './history-section.css';

import { getMedicalAppointmentHistory, getMedicalAppointmentHistoryById } from '../../../../../services/api/history';
import { updateModalContent } from '../../../../common/modals/modal-base';

const historySection = async (idUser) => {
    try {
        const appointmentHistory = await getMedicalAppointmentHistory(idUser);

        const section = document.createElement('section');
        section.id = 'historial-citas';
        section.className = 'col-lg-9 col-sm-12';

        const title = document.createElement('h3');
        title.className = 'mt-3';
        title.textContent = 'Historial de citas';

        const container = document.createElement('div');
        container.className = 'container mb-3';

        const row = document.createElement('div');
        row.className = 'row d-flex justify-content-evenly p-3';
        
        if(appointmentHistory.length) {
        appointmentHistory.forEach((appointment) => {
            const { id, payment, medical_appointment: { doctor }, patient, status } = appointment;
            const { nombre: nombreDoctor, apellido: apellidoDoctor, specialy: { nombre: nombreSpecialy } } = doctor;
            const { nombre: nombrePaciente, apellido: apellidoPaciente } = patient;

            const col = document.createElement('div');
            col.className = 'col-lg-6 col-md-6 col-sm-12';

            const card = document.createElement('div');
            card.className = 'card p-3 mb-4';

            const doctorName = document.createElement('p');
            doctorName.className = 'mb-0 mt-3';
            doctorName.innerHTML = `<strong>Dr.</strong> ${nombreDoctor} ${apellidoDoctor}`;

            const specialy = document.createElement('p');
            specialy.className = 'mb-0';
            specialy.innerHTML = `<strong>Especialidad:</strong> ${nombreSpecialy}`;

            const patientName = document.createElement('p');
            patientName.className = 'mb-0';
            patientName.innerHTML = `<strong>Paciente: </strong>${nombrePaciente} ${apellidoPaciente}`;

            const paymentStatus = document.createElement('p');
            paymentStatus.className = payment ? 'text-success' : 'text-danger';
            paymentStatus.textContent = `Estado de pago: xxxxxxx ${status} xxxxxxx`;

            const textCenter = document.createElement('div');
            textCenter.className = 'text-center';

            const viewDetailsLink = document.createElement('a');
            viewDetailsLink.href = '';
            viewDetailsLink.type = 'submit';
            viewDetailsLink.className = 'btn btn-outline-primary';
            viewDetailsLink.onclick = (e) => {
                e.preventDefault();
                modalHistory(id);
            };
            viewDetailsLink.textContent = 'Ver detalles de la cita';

            textCenter.appendChild(viewDetailsLink);

            card.appendChild(doctorName);
            card.appendChild(specialy);
            card.appendChild(patientName);
            card.appendChild(paymentStatus);
            card.appendChild(textCenter);

            col.appendChild(card);
            row.appendChild(col);
        });
    } else {
        const col = document.createElement('div');
        col.className = 'col-lg-6 col-md-6 col-sm-12';

        const card = document.createElement('div');
        card.className = 'card p-3 mb-4';

        const textCenter = document.createElement('div');
        textCenter.className = 'text-center';

        const noAppointments = document.createElement('p');
        noAppointments.className = 'mb-0';
        noAppointments.textContent = 'No tienes citas agendadas';

        textCenter.appendChild(noAppointments);

        card.appendChild(textCenter);

        col.appendChild(card);
        row.appendChild(col);
    }

        container.appendChild(row);
        section.appendChild(title);
        section.appendChild(container);

        return section;
    } catch (error) {
        console.log(error);
    }
};

export default historySection;

// <-- MODALS -->
// Ver detalle del historial de citas
const modalHistory = async (idMedicalAppointment) => {
    try {
        const modal = new bootstrap.Modal(document.getElementById('agendar-cita-modal'));

        // Get appointment data from API
        const history = await getMedicalAppointmentHistoryById(idMedicalAppointment);

        const { patient, medical_appointment, payment, status } = history;
        const { nombre: nombrePaciente, apellido: apellidoPaciente } = patient;
        const { doctor: { specialy: { nombre: nombreEspecialidad }, nombre: nombreDoctor, apellido: apellidoDoctor, img: imgDoctor }, fecha, sede } = medical_appointment;

        const modalTitleContainer = document.createElement('div');
        modalTitleContainer.className = 'modal-title-container d-flex justify-content-center align-items-center';
        const title = document.createElement('h5');
        title.className = 'modal-title-text text-info text-center fw-bold';
        title.textContent = 'CITA MÉDICA';
        modalTitleContainer.appendChild(title);

        const contentBody = document.createElement('div');
        contentBody.id = 'modal-show-history-content-body';
        contentBody.classList.add('row');

        const imageContainer = document.createElement('div');
        imageContainer.className = 'overflow-hidden rounded-circle mx-auto p-0 mb-3';
        imageContainer.style.width = '150px';
        imageContainer.style.height = '150px';
        // imageContainer.style.overflow = 'hidden';
        imageContainer.style.border = '2px solid';
        // imageContainer.style.borderRadius = '50%';

        const image = document.createElement('img');
        image.src = imgDoctor || '/assets/img/UserImages/app-logo3.png';
        image.alt = 'Imagen de perfil';
        image.className = 'img-fluid rounded-circle object-fit-fill w-100 h-100';

        imageContainer.appendChild(image);


        const contenidoDetalle = document.createElement('div');
        contenidoDetalle.className = 'contenidoDetalle';

        // Crear un contenedor para la información del doctor
        const doctorInfoContainer = document.createElement('div');
        doctorInfoContainer.className = 'doctor-info-container';

        const doctorName = document.createElement('p');
        doctorName.textContent = `Dr. ${nombreDoctor} ${apellidoDoctor}`;

        const speciality = document.createElement('p');
        speciality.textContent = `Especialidad: ${nombreEspecialidad}`;

        // Agregar la información del doctor al contenedor
        doctorInfoContainer.appendChild(doctorName);
        doctorInfoContainer.appendChild(speciality);

        // Crear un contenedor para la información del paciente
        const patientInfoContainer = document.createElement('div');
        patientInfoContainer.className = 'patient-info-container';

        const patientName = document.createElement('p');
        patientName.textContent = `Paciente: ${nombrePaciente} ${apellidoPaciente}`;

        const consultorio = document.createElement('p');
        consultorio.textContent = `Consultorio 201-${sede}`;

        const appointmentDate = document.createElement('p');
        appointmentDate.textContent = `Fecha: ${fecha}`;

        // Agregar la información del paciente al contenedor
        patientInfoContainer.appendChild(patientName);
        patientInfoContainer.appendChild(consultorio);
        patientInfoContainer.appendChild(appointmentDate);

        // Agregar los contenedores de información al contenidoDetalle
        contenidoDetalle.appendChild(doctorInfoContainer);
        contenidoDetalle.appendChild(patientInfoContainer);

        if (payment) {
            const { tipo_pago, rate_appointment: { monto, descripcion } } = payment;

            const paymentType = document.createElement('p');
            paymentType.textContent = `Tipo de pago: ${tipo_pago}`;

            const amount = document.createElement('p');
            amount.textContent = `Monto: $${monto}`;

            const description = document.createElement('p');
            description.textContent = `Descripción: ${descripcion}`;

            const paymentStatus = document.createElement('p');
            paymentStatus.textContent = `Estado de pago: ${status}`;

            contenidoDetalle.appendChild(paymentType);
            contenidoDetalle.appendChild(amount);
            contenidoDetalle.appendChild(description);
            contenidoDetalle.appendChild(paymentStatus);
        }

        contentBody.appendChild(imageContainer);
        contentBody.appendChild(contenidoDetalle);

        updateModalContent('agendar-cita-modal', modalTitleContainer, contentBody);

        modal.show();
    } catch (error) {
        console.log(error);
    }
};
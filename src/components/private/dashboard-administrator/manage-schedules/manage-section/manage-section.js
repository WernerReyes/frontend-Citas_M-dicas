import { getDoctors } from "../../../../../services/api/doctor";
import { createSchedule, getSchedules, updateSchedule } from "../../../../../services/api/schedule";
import { createSubmitInput, updateModalContent } from "../../../../common";
import { showAlert, showAlertArray } from "../../../../common/alerts/alerts";

const manageScheduleSection = async () => {
    try {

        // Get schedules from API
        const schedules = await getSchedules();

        const section = document.createElement('section');
        section.id = 'manage-schedule-section';
        section.classList.add('container-fluid');

        const title = document.createElement('h1');
        title.classList.add('mb-4', 'text-center');
        title.textContent = 'Gestionar Horarios';

        const tableContainer = document.createElement('div');
        tableContainer.classList.add('table-container', 'bg-light', 'p-4');
        tableContainer.id = 'tabla';

        const dFlex = document.createElement('div');
        dFlex.classList.add('d-flex', 'justify-content-end', 'mb-3');


        const buttonAdd = document.createElement('button');
        buttonAdd.classList.add('btn', 'btn-outline-dark');
        buttonAdd.type = 'button';
        buttonAdd.id = 'btnAgregarHorario';
        buttonAdd.textContent = 'Agregar Horario';
        buttonAdd.onclick = () => createOrEditScheduleModal(); // <-- Create the modal for add a schedule

        const tableResponsive = document.createElement('div');
        tableResponsive.classList.add('table-responsive');

        const table = document.createElement('table');
        table.classList.add('table', 'table-striped', 'table-bordered');

        const thead = document.createElement('thead');
        thead.classList.add('bg-dark', 'text-white');
        thead.innerHTML = `
        <tr>
            <th scope="col" class="text-center">Fecha</th>
            <th scope="col" class="text-center">Hora Inicio</th>
            <th scope="col" class="text-center">Hora Fin</th>
            <th scope="col" class="text-center">Doctor</th>
            <th scope="col" class="text-center">Acciones</th>
        </tr>
    `;

        const tbody = document.createElement('tbody');
        tbody.id = 'tbody';
        if (schedules.length) {
            schedules.forEach(schedule => {
                const tr = createTableRow(schedule);
                tbody.appendChild(tr);
            });
        } else {
            const tr = document.createElement('tr');
            tr.innerHTML = `
            <td colspan="5" class="text-center">No hay horarios registrados</td>
        `;
            tbody.appendChild(tr);
        }


        table.appendChild(thead);
        table.appendChild(tbody);

        tableResponsive.appendChild(table);

        dFlex.appendChild(buttonAdd);

        tableContainer.appendChild(dFlex);
        tableContainer.appendChild(tableResponsive);

        section.appendChild(title);
        section.appendChild(tableContainer);

        return section;
    } catch (error) {
        console.error(error);
    }
};

export default manageScheduleSection;

// -- Helper --
// Desc: Create a table row for each schedule
const createTableRow = (schedule) => {
    const { fecha, hora_fin, hora_inicio, doctor: { nombre, apellido }, id } = schedule;
    const tr = document.createElement('tr');
    tr.dataset.id = id;
    tr.innerHTML = `
        <td class="text-center">${fecha}</td>
        <td class="text-center">${hora_inicio}</td>
        <td class="text-center">${hora_fin}</td>
        <td class="text-center">${nombre} ${apellido}</td>
        <td class="text-center">
            <button class="btn btn-outline-info btn-sm btnEditarHorario" data-id="${id}">Editar</button>
            <button class="btn btn-outline-danger btn-sm btnEliminarHorario" data-id="${id}">Eliminar</button>
        </td>
    `;

    // Edit schedule
    const btnEdit = tr.querySelector('.btnEditarHorario');
    btnEdit.onclick = () => createOrEditScheduleModal(schedule);

    return tr;
}

// -- Modal --
// Desc: Create the modal for add or edit a schedule
const createOrEditScheduleModal = async (schedule = null) => {

    // Get doctors from API
    const doctors = await getDoctors();

    // Create the modal component
    const modal = new bootstrap.Modal(document.getElementById('schedule-modal'));

    const modalTitle = document.createElement('div');
    modalTitle.classList.add('modal-title');
    modalTitle.id = 'schedule-modal-title';
    modalTitle.innerHTML = `
        <h5 class="modal-title" id="exampleModalLabel">${!schedule?.id ? 'Agregar' : 'Editar'} Horario</h5>
    `;

    const form = document.createElement('form');
    form.id = 'schedule-form';
    form.classList.add('needs-validation', 'px-5');

    const inputFecha = document.createElement('input');
    inputFecha.type = 'date';
    inputFecha.id = 'fecha';
    inputFecha.classList.add('form-control', 'mb-3');
    inputFecha.value = schedule?.fecha || '';

    const inputHoraInicio = document.createElement('input');
    inputHoraInicio.type = 'time';
    inputHoraInicio.id = 'hora_inicio';
    inputHoraInicio.classList.add('form-control', 'mb-3');
    inputHoraInicio.value = schedule?.hora_inicio || '';

    const inputHoraFin = document.createElement('input');
    inputHoraFin.type = 'time';
    inputHoraFin.id = 'hora_fin';
    inputHoraFin.classList.add('form-control', 'mb-3');
    inputHoraFin.value = schedule?.hora_fin || '';

    const selectDoctor = document.createElement('select');
    selectDoctor.id = 'doctor_id';
    selectDoctor.classList.add('form-select', 'mb-3');
    if (doctors.length) {
        doctors.forEach(doctor => {
            const option = document.createElement('option');
            option.value = doctor.id;
            option.textContent = `${doctor.nombre} ${doctor.apellido}`;
            if (schedule?.doctor_id === doctor.id) {
                option.selected = true;
            }
            selectDoctor.appendChild(option);
        });
    } else {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'No hay doctores registrados';
        option.disabled = true;
        option.selected = true;
        selectDoctor.appendChild(option);
    }

    const buttonSubmit = createSubmitInput({ value: `${!schedule?.id ? 'Agregar' : 'Editar'} Horario`, divClasses: 'w-50 mx-auto' });


    form.appendChild(inputFecha);
    form.appendChild(inputHoraInicio);
    form.appendChild(inputHoraFin);
    form.appendChild(selectDoctor);
    form.appendChild(buttonSubmit);

    // send data to server
    form.addEventListener('submit', (e) => sendDataServer(e, schedule?.id));

    updateModalContent('schedule-modal', modalTitle, form);

    modal.show();

};

// Desc: Send data to server
const sendDataServer = async (e, id = null) => {
    e.preventDefault();
    try {
        const { fecha, hora_inicio, hora_fin, doctor_id } = e.target;
        const data = {
            fecha: fecha.value,
            hora_inicio: hora_inicio.value,
            hora_fin: hora_fin.value,
            doctor_id: doctor_id.value
        };

        if (Object.values(data).some(value => !value)) {
            showAlert({ icon: 'error', title: 'Todos los campos son obligatorios' });
            return;
        }

        if (id) {
            // Edit schedule
            const { message, schedule } = await updateSchedule(data, id);
            const tr = createTableRow(schedule);
            const trOld = document.querySelector(`tr[data-id="${id}"]`);
            trOld.replaceWith(tr);

            showAlert({ icon: 'success', title: message });

        } else {
            // Create schedule
            const { message, schedule } = await createSchedule(data);

            const tr = createTableRow(schedule);
            const tbody = document.getElementById('tbody');
            tbody.appendChild(tr);

            showAlert({ icon: 'success', title: message });
        }

        e.target.reset();

    } catch ({ data, status }) {
        if (status === 400) {
            showAlertArray({ icon: 'error', errors: data.message });
        } else if (status === 422) {
            showAlert({ icon: 'error', title: data.message })
        }
    }
}


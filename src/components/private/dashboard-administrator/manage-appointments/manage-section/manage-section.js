import { completeAppointment, getMedicalAppointments } from "../../../../../services/api/appointment";
import { updateModalContent } from "../../../../common";
import { showConfirmAlertComplete } from "../../../../common/alerts/alerts";

const manageAppointmentsSection = async () => {
    try {

        // Get appointments from API
        const appointments = await getMedicalAppointments({ estado: 'Cita pagada' });

        const section = document.createElement('section');
        section.id = 'manage-section';
        section.classList.add('container-fluid', 'overflow-hidden');

        const title = document.createElement('h1');
        title.classList.add('mb-4', 'text-center');
        title.textContent = 'Gestionar Citas Médicas';

        const tableContainer = document.createElement('div');
        tableContainer.classList.add('table-container', 'bg-light', 'p-4');
        tableContainer.id = 'tabla';

        const dFlex = document.createElement('div');
        dFlex.classList.add('d-flex', 'justify-content-between', 'mb-3');

        const form = document.createElement('form');
        form.classList.add('d-flex');

        const input = document.createElement('input');
        input.classList.add('form-control', 'me-2');
        input.type = 'search';
        input.name = 'search';
        input.placeholder = 'Buscar paciente';

        const button = document.createElement('button');
        button.classList.add('btn', 'btn-outline-dark');
        button.type = 'submit';
        button.id = 'btnBuscarPaciente';
        button.textContent = 'Buscar';

        const tableResponsive = document.createElement('div');
        tableResponsive.classList.add('table-responsive');

        const table = document.createElement('table');
        table.classList.add('table', 'table-striped', 'table-bordered');

        const thead = document.createElement('thead');
        thead.classList.add('bg-dark', 'text-white');
        thead.innerHTML = `
        <tr>
            <th scope="col" class="text-center">Paciente</th>
            <th scope="col" class="text-center">Medico</th>
            <th scope="col" class="text-center">Fecha</th>
            <th scope="col" class="text-center">Estado</th>
            <th scope="col" class="text-center">Acciones</th>
        </tr>
    `;

        const tbody = document.createElement('tbody');
        tbody.id = 'tbody';

        if (appointments.length) {
            appointments.forEach(appointment => {
                const tr = createTableRow(appointment);
                tbody.appendChild(tr);
            }
            );
        } else {
            const tr = document.createElement('tr');
            tr.innerHTML = `
            <td colspan="4" class="text-center">No hay citas registradas</td>
        `;
            tbody.appendChild(tr);
        }

        table.appendChild(thead);
        table.appendChild(tbody);

        tableResponsive.appendChild(table);

        form.appendChild(input);
        form.appendChild(button);
        form.onsubmit = (e) => {
            e.preventDefault();
            const tbody = document.getElementById('tbody');
            tbody.innerHTML = '';
            const search = input.value;
                const appointmentsFiltered = appointments.filter(appointment => {
                    const {
                        patient: { nombre: namePatient, apellido: lastnamePatient },
                    } = appointment;
                    const patient = `${namePatient} ${lastnamePatient}`;
                    return patient.toLowerCase().includes(search.toLowerCase());
                });
                if (appointmentsFiltered.length) {
                    appointmentsFiltered.forEach(appointment => {
                        const tr = createTableRow(appointment);
                        tbody.appendChild(tr);
                    });
                } else {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td colspan="4" class="text-center">No hay citas registradas</td>
                    `;
                    tbody.appendChild(tr);
                }
        }

        dFlex.appendChild(form);

        tableContainer.appendChild(dFlex);

        tableContainer.appendChild(tableResponsive);

        section.appendChild(title);
        section.appendChild(tableContainer);

        return section;
    } catch (error) {
        console.log(error);
    }
};

export default manageAppointmentsSection;

// -- Helpers --
const createTableRow = (appointment) => {
    const {
        patient: { nombre: namePatient, apellido: lastnamePatient },
        doctor: { nombre: nameDoctor, apellido: lastnameDoctor },
        fecha, estado_medico, id
    } = appointment;
    const tr = document.createElement('tr');
    tr.id = id;
    tr.innerHTML = `
        <td class="text-center">${namePatient} ${lastnamePatient}</td>
        <td class="text-center">${nameDoctor} ${lastnameDoctor}</td>
        <td class="text-center">${fecha}</td>
        <td class="text-center ${estado_medico === 'proceso' ? 'text-warning' : 'text-success'}"> xxxxxxx ${estado_medico} xxxxxxx </td>
        <td class="text-center">
            <button id="complete-appointment" class="btn btn-outline-success btn-sm ${estado_medico === 'proceso' ? '' : 'd-none'}">Completar Cita</button>
            <button id="view-appointment" class="btn btn-outline-danger btn-sm">Ver cita medica</button>
        </td>
    `;

    // Complete appointment
    const btnCompleteAppointment = tr.querySelector('#complete-appointment');
    btnCompleteAppointment.onclick = async() => {
        const confirm = await showConfirmAlertComplete({ icon: 'warning' });
        if (!confirm) return;

        const { appointment } = await completeAppointment(id);

        const tr = createTableRow(appointment);
        const tbody = document.getElementById('tbody');
        tbody.replaceChild(tr, document.getElementById(id));
    }

    // View appointment
    const btnViewAppointment = tr.querySelector('#view-appointment');
    btnViewAppointment.onclick = () => viewAppointmentModal(appointment);
    
    return tr;
}

// -- Modal --
const viewAppointmentModal = (appointment) => {
    const modal = new bootstrap.Modal(document.getElementById('view-appointment-modal'));

    const modalTitle = document.createElement('div');
    modalTitle.classList.add('modal-title');
    modalTitle.innerHTML = `
        <h5 class="modal-title">Cita Médica</h5>
    `;

    const contentBody = document.createElement('div');
    contentBody.className = 'container-fluid';
    contentBody.innerHTML = `
        <div class="row">
            <div class="col-12">
                <div class="mb-3">
                    <label for="patient" class="form-label">Paciente</label>
                    <input type="text" class="form-control" id="patient" value="${appointment.patient.nombre} ${appointment.patient.apellido}" disabled>
                </div>
            </div>
            <div class="col-12">
                <div class="mb-3">
                    <label for="doctor" class="form-label">Médico</label>
                    <input type="text" class="form-control" id="doctor" value="${appointment.doctor.nombre} ${appointment.doctor.apellido}" disabled>
                </div>
            </div>
            <div class="col-12">
                <div class="mb-3">
                    <label for="date" class="form-label">Fecha</label>
                    <input type="text" class="form-control" id="date" value="${appointment.fecha}" disabled>
                </div>
            </div>
            <div class="col-12">
                <div class="mb-3">
                    <label for="time" class="form-label">Hora</label>
                    <input type="text" class="form-control" id="time" value="${appointment.schedule.hora_inicio} - ${appointment.schedule.hora_fin}" disabled>
                </div>
            </div>
            <div class="col-12">
                <div class="mb-3">
                    <label for="state" class="form-label">Estado</label>
                    <input type="text" class="form-control" id="state" value="${appointment.estado_medico}" disabled>
                </div>
            </div>
        </div>
    `;

    

    updateModalContent('view-appointment-modal',modalTitle, contentBody);

    modal.show();
};
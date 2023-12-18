import { createDoctor, getDoctors, updateDoctor } from "../../../../../services/api/doctor";
import { getSpecialties } from "../../../../../services/api/specialty";
import { validateInputs } from "../../../../../utils/validations";
import validations from "../../../../../validations-inputs";
import { createInput, createSubmitInput, updateModalContent } from "../../../../common";
import { showAlert, showAlertArray } from "../../../../common/alerts/alerts";

const manageDoctosSection = async () => {
    try {

        // Get doctors from API
        const doctors = await getDoctors(null, '');

        const section = document.createElement('section');
        section.id = 'manage-doctors-section';

        const title = document.createElement('h1');
        title.classList.add('mb-4', 'text-center');
        title.textContent = 'Gestionar Médicos';

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
        input.placeholder = 'Buscar médico';

        const button = document.createElement('button');
        button.classList.add('btn', 'btn-outline-dark');
        button.type = 'submit';
        button.id = 'btnBuscarMedico';
        button.textContent = 'Buscar';

        const buttonAdd = document.createElement('button');
        buttonAdd.classList.add('btn', 'btn-outline-dark');
        buttonAdd.type = 'button';
        buttonAdd.id = 'btnAgregarMedico';
        buttonAdd.textContent = 'Agregar médico';
        buttonAdd.onclick = () => modalCreateOrEditDoctor(); // Open modal


        const tableResponsive = document.createElement('div');
        tableResponsive.classList.add('table-responsive');

        const table = document.createElement('table');
        table.classList.add('table', 'table-striped', 'table-bordered');

        const thead = document.createElement('thead');
        thead.classList.add('bg-dark', 'text-white');
        thead.innerHTML = `
        <tr>
            <th scope="col" class="text-center">Foto</th>
            <th scope="col" class="text-center">Nombre</th>
            <th scope="col" class="text-center">Apellido</th>
            <th scope="col" class="text-center">Gmail</th>
            <th scope="col" class="text-center">Telefono</th>
            <th scope="col" class="text-center">Especialidad</th>
            <th scope="col" class="text-center">DNI</th>
            <th scope="col" class="text-center">Opciones</th>
        </tr>
    `;

        const tbody = document.createElement('tbody');
        tbody.id = 'tbody';

        doctors.forEach(doctor => {
            const tr = createTableRow(doctor);
            tbody.appendChild(tr);
        });


        table.appendChild(thead);
        table.appendChild(tbody);

        tableResponsive.appendChild(table);

        form.appendChild(input);
        form.appendChild(button);
        form.onsubmit = async (e) => {
            e.preventDefault();
            const search = form['search'].value;

            // Get doctors from API with search
            const doctors = await getDoctors(null, search);

            tbody.innerHTML = '';

            if (doctors.length) {
                doctors.forEach(doctor => {
                    const tr = createTableRow(doctor);
                    tbody.appendChild(tr);
                });
            } else {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td colspan="8" class="text-center">No hay médicos registrados</td>
                `;
                tbody.appendChild(tr);
            }

        };

        dFlex.appendChild(form);
        dFlex.appendChild(buttonAdd);

        tableContainer.appendChild(dFlex);
        tableContainer.appendChild(tableResponsive);

        section.appendChild(title);
        section.appendChild(tableContainer);

        return section;
    } catch (error) {
        console.log(error);
    }
};

export default manageDoctosSection;


// -- Helper --
const createTableRow = (doctor) => {
    const { nombre, apellido, correo, telefono, specialy: { nombre: especialidad }, dni, img, id } = doctor;
    const tr = document.createElement('tr');
    tr.id = id;
    tr.innerHTML = `
        <td class="text-center" style="width:80px;height:80px"><img class="img-fluid rounded-circle object-fit-fill w-100  h-100" src="${img || '/assets/img/sin-perfil.jpg'}" alt="Foto de perfil"></td>
        <td class="text-center">${nombre}</td>
        <td class="text-center">${apellido}</td>
        <td class="text-center">${correo}</td>
        <td class="text-center">${telefono}</td>
        <td class="text-center">${especialidad}</td>
        <td class="text-center">${dni}</td>
        <td class="text-center">
            <button class="btn btn-outline-dark btn-sm" id="btnEditarMedico">Editar</button>
            <button class="btn btn-outline-danger btn-sm" id="btnEliminarMedico">Eliminar</button>
        </td>
    `;

    // Add event to edit button
    const btnEdit = tr.querySelector('#btnEditarMedico');
    btnEdit.onclick = () => modalCreateOrEditDoctor(doctor);

    return tr;
};

// -- Modal --
const modalCreateOrEditDoctor = async (doctor = null) => {
    // Get specialities from API
    const specialities = await getSpecialties();

    // Validations inputs
    const { nombre, apellido, dni, correo, password, telefono } = validations;

    const modal = new bootstrap.Modal(document.getElementById('doctor-modal'));

    const modalTitleContainer = document.createElement('div');
    modalTitleContainer.innerHTML = `
    <h5 class="modal-title" id="modalEditarMedicoLabel">Agregar Médico</h5>
    `;

    const formulario = document.createElement('form');
    // if(id) {
    //     formulario.id = id;
    // }

    const firtRow = document.createElement('div');
    firtRow.classList.add('row');
    const userNameInput = createInput({ id: 'nombre', placeholder: 'Tus nombres', validations: nombre, classes: 'mb-3 col-6', labelText: 'Nombres' })
    userNameInput.children[1].value = doctor?.nombre || '';
    const userLastNameInput = createInput({ id: 'apellido', placeholder: 'Tus apellidos', validations: apellido, classes: 'mb-3 col-6', labelText: 'Apellidos' })
    userLastNameInput.children[1].value = doctor?.apellido || '';
    firtRow.appendChild(userNameInput);
    firtRow.appendChild(userLastNameInput);

    const secondRow = document.createElement('div');
    secondRow.classList.add('row');
    const userDniInput = createInput({ id: 'dni', placeholder: 'Tu dni', validations: dni, classes: 'mb-3 col-6', labelText: 'DNI' })
    userDniInput.children[1].value = doctor?.dni || '';
    const userEmailInput = createInput({ id: 'email', placeholder: 'Tu correo electrónico', validations: correo, classes: 'mb-3 col-6', labelText: 'Correo' });
    userEmailInput.children[1].value = doctor?.correo || '';
    secondRow.appendChild(userDniInput);
    secondRow.appendChild(userEmailInput);

    const thirdRow = document.createElement('div');
    thirdRow.classList.add('row');
    const userPasswordInput = createInput({ id: 'password', placeholder: 'Tu contraseña', validations: password, classes: 'mb-3 col-6', type: 'password', labelText: 'Contraseña' });
    const userPhoneInput = createInput({ id: 'telefono', placeholder: 'Tu teléfono', validations: telefono, classes: `mb-3 col-${doctor?.id ? '12' : '6'}`, labelText: 'Telefono' });
    userPhoneInput.children[1].value = doctor?.telefono || '';
    if (!doctor?.id) {
        thirdRow.appendChild(userPasswordInput);
    }
    thirdRow.appendChild(userPhoneInput);

    const fourthRow = document.createElement('div');
    fourthRow.classList.add('row');
    const divSelect = document.createElement('div');
    divSelect.classList.add('mb-3', 'col-6');
    const labelSelect = document.createElement('label');
    labelSelect.classList.add('form-label');
    labelSelect.setAttribute('for', 'especialidad_idModal');
    labelSelect.textContent = 'Especialidad:';
    const select = document.createElement('select');
    select.classList.add('form-select', 'mb-3');
    select.id = 'especialidad_idModal';
    specialities.forEach(speciality => {
        const option = document.createElement('option');
        option.value = speciality.id;
        option.textContent = speciality.nombre;
        if (doctor?.especialidad_id === speciality.id) {
            option.selected = true;
        }
        select.appendChild(option);
    });
    divSelect.appendChild(labelSelect);
    divSelect.appendChild(select);
    const userAddressInput = createInput({ id: 'address', placeholder: 'Tu dirección', validations: undefined, classes: 'mb-3 col-6', labelText: 'Dirección ( Opcional )' });
    userAddressInput.children[1].value = doctor?.direccion || '';
    fourthRow.appendChild(divSelect);
    fourthRow.appendChild(userAddressInput);

    // Create button
    const button = createSubmitInput({ value: `${!doctor?.id ? 'Crear' : 'Editar'} Médico`, divClasses: 'text-center mx-5', disabled: true });

    formulario.appendChild(firtRow);
    formulario.appendChild(secondRow);
    formulario.appendChild(thirdRow);
    formulario.appendChild(fourthRow);
    formulario.appendChild(button);

    // Validate all inputs to enable button
    let inputs = Array.from(formulario.querySelectorAll('input[type="text"], input[type="password"]'));
    const cantidad = !doctor?.id ? 6 : 5;
    inputs = inputs.filter((_, index) => index < cantidad);
    validateInputs(inputs, button.children[0]);

    // Send data to server
    formulario.addEventListener('submit', (e) => sendDataServer(e, doctor?.id));

    updateModalContent('doctor-modal', modalTitleContainer, formulario);

    modal.show();
};

const sendDataServer = async (e, id = null) => {
    e.preventDefault();

    const data = {
        dni: e.target.dni.value,
        nombre: e.target.nombre.value,
        apellido: e.target.apellido.value,
        telefono: e.target.telefono.value,
        correo: e.target.email.value,
        password: e.target.password?.value,
        direccion: e.target.address.value,
        especialidad_id: e.target.especialidad_idModal.value,
    };

    try {
        if (id) {
       
            const { password, ...dataEdit } = data; // Remove password

            const { message, doctor } = await updateDoctor(dataEdit, id);

            const tr = createTableRow(doctor);
            const trOld = document.getElementById(id);
            trOld.replaceWith(tr);
            showAlert({ icon: 'success', title: message });
            return;
        }
        else {
            const { message, doctor } = await createDoctor(data);

            const tbody = document.getElementById('tbody');
            const tr = createTableRow(doctor);
            tbody.appendChild(tr);

            showAlert({ icon: 'success', title: message });
        }

        e.target.reset();

    } catch ({ data, status }) {
        if (status === 422) {
            showAlertArray({ icon: 'error', errors: data.errors })
        }
    }

};
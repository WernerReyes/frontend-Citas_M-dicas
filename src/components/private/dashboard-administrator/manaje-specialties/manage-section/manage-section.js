import { createSpecialty, deleteSpecialty, getSpecialties, updateSpecialty } from "../../../../../services/api/specialty";
import { validateInputs } from "../../../../../utils/validations";
import validations from "../../../../../validations-inputs";
import { createInput, createSubmitInput, createTextAreaInput, hideSpinner, showSpinner, updateModalContent } from "../../../../common";
import { showAlert, showAlertArray, showAlertDelete } from "../../../../common/alerts/alerts";

const manageSpecialtieSection = async () => {
    try {
        // Get specialties from API
        const specialties = await getSpecialties();

        const section = document.createElement('section');
        section.id = 'especialidades';
        section.classList.add('container-fluid');

        const title = document.createElement('h1');
        title.classList.add('mb-4', 'text-center');
        title.textContent = 'Gestionar Especialidades';

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
        input.placeholder = 'Buscar especialidad';

        const button = document.createElement('button');
        button.classList.add('btn', 'btn-outline-dark');
        button.type = 'submit';
        button.id = 'btnBuscarEspecialidad';
        button.textContent = 'Buscar';
        button.onclick = (e) => {
            e.preventDefault();

            const tbody = document.getElementById('tbody');
            tbody.innerHTML = '';

            const search = input.value.toLowerCase();

            const filteredSpecialties = specialties.filter(specialty => {
                const { nombre } = specialty;
                return nombre.toLowerCase().includes(search);
            });

            if (filteredSpecialties.length) {
                filteredSpecialties.forEach(specialty => {
                    const tr = createTableRow(specialty);
                    tbody.appendChild(tr);
                });
            } else {
                const tr = document.createElement('tr');
                tr.innerHTML = `
            <td colspan="4" class="text-center">No hay especialidades registradas</td>
        `;
                tbody.appendChild(tr);
            }
        }

        const buttonAdd = document.createElement('button');
        buttonAdd.classList.add('btn', 'btn-outline-dark');
        buttonAdd.type = 'button';
        buttonAdd.id = 'btnAgregarEspecialidad';
        buttonAdd.textContent = 'Agregar especialidad';
        buttonAdd.onclick = () => createOrEditSpecialtyModal();


        const tableResponsive = document.createElement('div');
        tableResponsive.classList.add('table-responsive');

        const table = document.createElement('table');
        table.classList.add('table', 'table-striped', 'table-bordered');

        const thead = document.createElement('thead');
        thead.classList.add('bg-dark', 'text-white');
        thead.innerHTML = `
        <tr>
            <th scope="col" class="text-center">Nombre</th>
            <th scope="col" class="text-center">Descripción</th>
            <th scope="col" class="text-center">Foto</th>
            <th scope="col" class="text-center">Acciones</th>
        </tr>
    `;

        const tbody = document.createElement('tbody');
        tbody.id = 'tbody';
        if (specialties.length) {
            specialties.forEach(specialty => {
                const tr = createTableRow(specialty);
                tbody.appendChild(tr);
            });
        } else {
            const tr = document.createElement('tr');
            tr.innerHTML = `
            <td colspan="4" class="text-center">No hay especialidades registradas</td>
        `;
            tbody.appendChild(tr);
        }


        table.appendChild(thead);
        table.appendChild(tbody);

        tableResponsive.appendChild(table);

        form.appendChild(input);
        form.appendChild(button);

        dFlex.appendChild(form);
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

export default manageSpecialtieSection;

// -- Helpers -- 
// Desc: Create a table row for each specialty
const createTableRow = (specialty) => {
    const { nombre, descripcion, img, id } = specialty;
    const tr = document.createElement('tr');
    tr.id = id;
    tr.innerHTML = `
        <td class="text-center">${nombre}</td>
        <td class="text-center">${descripcion}</td>
        <td class="text-center">
            <img src="${img || '/assets/img/UserImages/especialidadades/oftalmologia.png'}" alt="${nombre}" width="50" height="50">
        </td>
        <td class="text-center">
            <button class="btn btn-outline-dark" id="btnEditarEspecialidad">Editar</button>
            <button class="btn btn-outline-danger" id="btnEliminarEspecialidad">Eliminar</button>
        </td>
    `;

    // Edit specialty
    const btnEditarEspecialidad = tr.querySelector('#btnEditarEspecialidad');
    btnEditarEspecialidad.onclick = () => createOrEditSpecialtyModal(specialty);

    // Delete specialty
    const btnEliminarEspecialidad = tr.querySelector('#btnEliminarEspecialidad');
    btnEliminarEspecialidad.onclick = async () => {
        try {
            const confirm = await showAlertDelete({ icon: 'warning' });
            if (confirm) {
                const { message } = await deleteSpecialty(id);
                tr.remove();
                showAlert({ icon: 'success', title: message });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return tr;
}

// -- Modals --
// Desc: Create a modal for edit specialty
const createOrEditSpecialtyModal = (specialty) => {
    console.log(specialty);
    const { nombre, mensaje } = validations;

    const modal = new bootstrap.Modal(document.getElementById('specialty-modal'));

    const modalTitle = document.createElement('div');
    modalTitle.classList.add('modal-title');
    modalTitle.innerHTML = `
        <h5 class="modal-title">${!specialty?.id ? 'Crear' : 'Editar'} especialidad</h5>
    `;

    const form = document.createElement('form');
    form.id = 'form-specialty';
    form.classList.add('row', 'px-5', 'needs-validation');

    const nombreInput = createInput({ id: 'nombre', placeholder: 'Nombre de especialidad', validations: nombre, classes: 'mb-3 col-12' })
    nombreInput.children[0].value = specialty?.nombre || '';

    const descripcionTextarea = createTextAreaInput('descripcion', 'Agrega descripcion', mensaje);
    descripcionTextarea.children[0].textContent = specialty?.descripcion || '';

    const imgInput = document.createElement('input');
    imgInput.classList.add('form-control', 'mb-3', 'col-12');
    imgInput.type = 'file';
    imgInput.name = 'img';
    imgInput.id = 'img';
    imgInput.accept = 'image/jpeg, image/png, image/jpg';

    // Create button
    const button = createSubmitInput({ value: `${!specialty?.id ? 'Crear' : 'Editar'}  especialidad`, divClasses: 'text-center w-75 mx-auto', disabled: true });

    form.appendChild(nombreInput);
    form.appendChild(descripcionTextarea);
    form.appendChild(imgInput);
    form.appendChild(button);

    // Validate all inputs to enable button
    const inputs = Array.from(form.querySelectorAll('input[type="text"], textarea'));
    validateInputs(inputs, button.children[0]);

    // Send data to server
    form.addEventListener('submit', (e) => sendDataServer(e, specialty?.id));

    updateModalContent('specialty-modal', modalTitle, form);

    modal.show();


};

// Desc: Send data to server
const sendDataServer = async (e, id) => {
    e.preventDefault();

    // Verificar que se ha seleccionado un archivo
    if (e.target.img.files.length === 0 && !id) {
        showAlert({ icon: 'error', title: 'Debes seleccionar una imagen' });
        return;
    }

    const formData = new FormData();
    formData.append('nombre', e.target.nombre.value);
    formData.append('descripcion', e.target.descripcion.value);
    formData.append('file', e.target.img.files[0]);

    showSpinner();

    try {

        if (!id) {
            const { specialty, message } = await createSpecialty(formData);

            const tr = createTableRow(specialty);
            const tbody = document.getElementById('tbody');
            tbody.appendChild(tr);


            showAlert({ icon: 'success', title: message });
        } else {
            const { specialty, message } = await updateSpecialty(formData, id);

            const tr = createTableRow(specialty);
            const trOld = document.getElementById(id);
            trOld.replaceWith(tr);

            showAlert({ icon: 'success', title: message });
        }


        e.target.descripcion.textContent = '';
        e.target.reset();

    } catch ({ data, status }) {
        if (status === 422) {
            showAlertArray({ icon: 'error', errors: data.errors })
        }
    }

    hideSpinner();
};

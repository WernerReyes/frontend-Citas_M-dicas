import { getUsers } from "../../../../../services/api/user";

const manageUserSection = async () => {
    try {

        // Get users from API
        const { total_users, users } = await getUsers({});
        console.log(users);

        const section = document.createElement('section');
        section.id = 'manage-section';
        section.classList.add('container-fluid', 'overflow-hidden');

        const title = document.createElement('h1');
        title.classList.add('mb-4', 'text-center');
        title.textContent = 'Gestionar Pacientes';

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
            <th scope="col" class="text-center">Foto</th>
            <th scope="col" class="text-center">Nombre</th>
            <th scope="col" class="text-center">Apellido</th>
            <th scope="col" class="text-center">Correo</th>
            <th scope="col" class="text-center">DNI</th>
            <th scope="col" class="text-center">Telefono</th>
            <th scope="col" class="text-center">Acciones</th>
        </tr>
    `;

        const tbody = await showUsers(users); // Show users in table body


        table.appendChild(thead);
        table.appendChild(tbody);

        tableResponsive.appendChild(table);

        form.appendChild(input);
        form.appendChild(button);
        form.onsubmit = async (e) => {
            e.preventDefault();

            const search = form['search'].value;

            // Get users from API with search
            const { total_users, users } = await getUsers({ search });

            const tbody = await showUsers(users);

            table.removeChild(table.tBodies[0]); // Remove old tbody

            table.appendChild(tbody);

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

export default manageUserSection;

// -- Helpers --
const showUsers = async (users) => {
    const tbody = document.createElement('tbody');
    tbody.id = 'pacientes-lista';

    if (users.length) {
        users.forEach(user => {
            const { img, id, nombre, apellido, correo, dni, telefono } = user;
            const tr = document.createElement('tr');
            tr.id = id;
            tr.innerHTML = `
        <td class="text-center" style="width: 100px; height: 100px">
            <img class="img-fluid rounded-circle object-fit-fill w-100  h-100" src="${img || '/assets/img/sin-perfil.jpg'}" alt="Foto de perfil">
        </td>
        <td class="text-center">${nombre}</td>
        <td class="text-center">${apellido}</td>
        <td class="text-center">${correo}</td>
        <td class="text-center">${dni}</td>
        <td class="text-center">${telefono}</td>
        <td class="text-center">
            <button class="btn btn-outline-danger" type="button" id="btnEliminarPaciente" data-id="${id}">Eliminar</button>
        </td>
    `;
            tbody.appendChild(tr);
        });
    } else {
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td class="text-center" colspan="7">No hay pacientes registrados</td>
    `;
        tbody.appendChild(tr);
    }

    return tbody;

};


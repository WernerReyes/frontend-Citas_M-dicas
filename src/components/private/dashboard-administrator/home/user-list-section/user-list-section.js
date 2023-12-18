import { formatDate } from "@fullcalendar/core";
import { getUsers } from "../../../../../services/api/user";

const userListSection = async () => {
    try {

        // Get all users from API
        const { total_users, users } = await getUsers({});
        
        const section = document.createElement('section');
        section.classList.add('col-12', 'col-md-6', 'col-lg-10', 'mx-auto');
        section.id = 'user-list-section';

        const title = document.createElement('h1');
        title.classList.add('mb-4', 'text-center');
        title.textContent = 'Usuarios recien registrados';

        const tableContainer = document.createElement('div');
        tableContainer.classList.add('table-container', 'bg-light', 'p-4');
        tableContainer.id = 'tabla';

        const tableResponsive = document.createElement('div');
        tableResponsive.classList.add('table-responsive');

        const table = document.createElement('table');
        table.classList.add('table', 'table-striped', 'table-bordered');

        const thead = document.createElement('thead');
        thead.classList.add('bg-dark', 'text-white');
        thead.innerHTML = `
            <tr>
                <th scope="col" class="text-center">Nombres</th>
                <th scope="col" class="text-center">Apellidos</th>
                <th scope="col" class="text-center">Correo</th>
                <th scope="col" class="text-center">Direccion</th>
                <th scope="col" class="text-center">DNI</th>
                <th scope="col" class="text-center">Telefono</th>
                <th scope="col" class="text-center">Creacion</th>
            </tr>
        `;

        const tbody = document.createElement('tbody');
        tbody.id = 'recien-ingresados';

        users.forEach(user => {

            const { nombre, apellido, correo, direccion, dni, telefono, created_at  } = user;

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="text-center">${nombre}</td>
                <td class="text-center">${apellido}</td>
                <td class="text-center">${correo}</td>
                <td class="text-center">${direccion}</td>
                <td class="text-center">${dni}</td>
                <td class="text-center">${telefono}</td>
                <td class="text-center">${formatDate(created_at)}</td>
            `;
            tbody.appendChild(tr);
        });

        table.appendChild(tbody);
        table.appendChild(thead);
        tableResponsive.appendChild(table);
        tableContainer.appendChild(tableResponsive);
        section.appendChild(title);
        section.appendChild(tableContainer);




        return section;
    } catch (error) {
        console.log(error);
    }
};

export default userListSection;

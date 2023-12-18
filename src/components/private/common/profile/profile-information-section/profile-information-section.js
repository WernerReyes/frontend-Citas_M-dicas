import './profile-information-section.css';

import URLS_APP from '../../../../../urls-app';

import { profileLink } from '../../../../../utils/common';

const createProfileSection = (user) => {
    const { img, nombre, correo, apellido, direccion, dni, telefono } = user;
    const section = document.createElement('section');
    section.id = 'profile-section';
    section.className = 'container d-flex justify-content-center align-items-center';
    section.innerHTML = `
    <div class="row contenido" id="info-admin">
    <h2 class="info text-center mb-0">INFORMACIÓN</h2>
        <div class="col-md-5 mt-4 mb-2">
        <div class="mx-auto rounded-circle" style="width: 200px; height: 200px;">
        <div class="rounded-circle" style="width: 100%; height: 100%; overflow: hidden;">
            <img src="${img || '/assets/img/sin-perfil.jpg'}" alt="Imagen de usuario"
                class="img-fluid object-fit-fill" style="width: 100%; height: 100%;">
        </div>
    </div>
        </div>
        <div class="col-md-7 text-start px-4">
            <p id="nombre"><strong>Nombre:</strong> ${nombre}</p>
            <p id="apellidos"><strong>Apellidos:</strong> ${apellido}</p>
            <p id="correo"><strong>Correo:</strong> ${correo}</p>
            <p id="direccion"><strong>Dirección: </strong> ${direccion || '[ Sin dirección ]'}</p>
            <p id="dni"><strong>DNI: </strong> ${dni}</p>
            <p id="telefono"><strong>Telefono: </strong> ${telefono}</p>
        </div>
        <div class="col-md-12">
            <a id="editar-perfil" href="${profileLink(URLS_APP.EDIT_PROFILE_DASHBOARD_USER, URLS_APP.EDIT_PROFILE_DASHBOARD_MEDICAL)}" class="btn btn-lg"><i class="bi bi-pencil-fill"></i>Editar perfil</a>
        </div>
    </div>
    `;

    return section;
};

export default createProfileSection;


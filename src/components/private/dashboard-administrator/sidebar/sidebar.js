import { logoutPage } from '../../../../services/api/auth';
import URLS_APP from '../../../../urls-app';
import { redirecToPage } from '../../../../utils/common';
import { showSpinner } from '../../../common';
import './sidebar.css';

const sidebarAdministator = () => {
    const sibebar = document.createElement('aside');
    sibebar.id = 'sidebar-administrator';
    sibebar.classList.add('bg-dark', 'col-3', 'col-sm-4', 'col-md-2');
    sibebar.innerHTML = `
        <div class="p-2">
            <a class="d-flex text-decoration-none mt-1 align-items-center text-white">
            <div class="d-flex align-items-center justify-content-center">
                <img src="/assets/img/UserImages/logo2-sin-fondo.png" class="img-fluid w-75 h-75" style="margin: 20px;">
            </div> 
                </a>
            <ul class="nav nav-pills flex-column ">
                <li class="nav-item py-2 py-sm-0">
                    <a href="${URLS_APP.HOME_DASHBOARD_ADMINISTRATOR}" class="nav-link text-white" aria-current="page">
                        <i class="fs-5 fa fa-house"></i><span class=" ms-3 d-none d-sm-inline">Panel Administrador</span>
                    </a>
                </li>
                <li class="nav-item py-2 py-sm-0">
                    <a href="${URLS_APP.MANAGE_APPOINTMENTS_DASHBOARD_ADMINISTRATOR}" class="nav-link text-white" aria-current="page">
                        <i class="fs-5 fa fa-gauge"></i><span class=" ms-3 d-none d-sm-inline">Gestion de Citas</span>
                    </a>
                </li>
                <li class="nav-item py-2 py-sm-0">
                    <a href="${URLS_APP.MANAGE_PATIENTS_DASHBOARD_ADMINISTRATOR}" class="nav-link text-white" aria-current="page">
                        <i class="fs-5 fa fa-users"></i><span class=" ms-3 d-none d-sm-inline">Gestion de Pacientes</span>
                    </a>
                </li>
                <li class="nav-item py-2 py-sm-0">
                    <a href="${URLS_APP.MANAGE_DOCTORS_DASHBOARD_ADMINISTRATOR}" class="nav-link text-white" aria-current="page">
                        <i class="fs-5 fa fa-users"></i><span class=" ms-3 d-none d-sm-inline">Gestion de medicos</span>
                    </a>
                </li>
                <li class="nav-item py-2 py-sm-0">
                    <a href="${URLS_APP.MANAGE_SPECIALTIES_DASHBOARD_ADMINISTRATOR}" class="nav-link text-white" aria-current="page">
                        <i class="fs-5 fa fa-clipboard"></i><span class=" ms-3 d-none d-sm-inline">Gestion de Especialidad</span>
                    </a>
                </li>
                <li class="nav-item py-2 py-sm-0">
                    <a href="${URLS_APP.MANAGE_SCHEDULES_DASHBOARD_ADMINISTRATOR}" class="nav-link text-white" aria-current="page">
                        <i class="fs-5 fa fa-clipboard"></i><span class=" ms-3 d-none d-sm-inline">Gestion de Horarios</span>
                    </a>
                </li>
            </ul>
        </div>

        <div class="dropdown open p-3">
            <button class="btn border-none dropdown-toggle text-white" type="button" id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true"
                aria-expanded="false">
                <i class="fa fa-user"></i><span class="ms-2">Perfil</span>
            </button>
            <div class="dropdown-menu" aria-labelledby="triggerId">
                <a class="dropdown-item" href="${URLS_APP.PROFILE_DASHBOARD_ADMINISTRATOR}">Ver perfil</a>
                <a id="logout" class="dropdown-item" href="">Cerrar session</a>
            </div>
        </div>`;

    const cerrarSesion = sibebar.querySelector('#logout');
    console.log(cerrarSesion)
    cerrarSesion.onclick = async (e) => {
        e.preventDefault();
        try {
            const data = await logoutPage();

            if (data) {
                // Show spinner
                showSpinner();
                // Remove token
                localStorage.removeItem('token');
                redirecToPage(URLS_APP.LOGIN_CLINIC);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return sibebar;
};

export default sidebarAdministator;


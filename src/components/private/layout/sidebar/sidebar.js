import './sidebar.css';

import URLS_APP from '../../../../urls-app/';
import { logoutPage } from '../../../../services/api/auth';
import { redirecToPage, includePathUser, profileLink } from '../../../../utils/common';
import { showSpinner } from '../../../common';

// Get the current path
const path = window.location.pathname;

const sidebar = ({ nombre, apellido, img }) => {
  const section = document.createElement('section');
  section.id = 'sidebar';
  section.className = 'offcanvas offcanvas-end p-3';
  section.setAttribute('tabindex', '-1');
  section.setAttribute('aria-labelledby', 'offcanvasRightLabel');
  section.innerHTML = `
    <div class="offcanvas-header">
      <div class="perfil-usuario d-flex">
      <div class="img-foto" style="width: 60px; height: 60px; overflow: hidden;">
      <img id="foto-sidebar" src="${img || '/assets/img/sin-perfil.jpg'}" class="img-fluid object-fit-fill rounded rounded-circle" style="width: 100%; height: 100%;" />
  </div>
        <div class="ms-2 datos">
          <h3 class="m-0 p-0">${nombre.toUpperCase()}</h3>
          <p class="m-0 p-0">${apellido}</p>
          <a href="${profileLink(URLS_APP.EDIT_PROFILE_DASHBOARD_USER, URLS_APP.EDIT_PROFILE_DASHBOARD_MEDICAL)}" class="m-0 p-0" style="color: #30cfe1;"><i class="bi bi-pencil-fill"></i> Editar perfil</a>
        </div>
      </div>
    </div>
    <div class="offcanvas-body">
      <div class="servicios w-100">
        <h3>Servicios</h3>
        <ul class="p-0">
          <li class="m-0">
            <a href="${profileLink(URLS_APP.HOME_DASHBOARD_USER, URLS_APP.HOME_DASHBOARD_MEDICAL)}"><i class="bi bi-${includePathUser() ? 'calendar2-check' : 'house'}"></i> ${includePathUser() ? 'Agenda una cita' : 'Inicio'}</a>
            <hr class="mt-1" />
          </li>
          <li class="m-0">
            <a href="${profileLink(URLS_APP.APPOINTMENT_HISTORY_DASHBOARD_USER, URLS_APP.APPOINTMENT_HISTORY_DASHBOARD_MEDICAL)}"><i class="bi bi-file-person-fill"></i> Mi historial de citas</a>
            <hr class="mt-1" />
          </li>
          <li class="m-0 ${!includePathUser() ? 'd-none' : ''}">
            <a href="${URLS_APP.SEACH_DOCTOR_DASHBOARD_USER}"><i class="bi bi-stopwatch"></i> Busca a tu medico</a>
            <hr class="mt-1" />
          </li>
        </ul>
      </div>
      <div class="administracion">
        <h3>Administración</h3>
        <ul class="p-0">
          <li class="m-0">
            <a href="${profileLink(URLS_APP.PROFILE_DASHBOARD_USER, URLS_APP.PROFILE_DASHBOARD_MEDICAL)}"><i class="bi bi-person-fill"></i> Perfil</a>
            <hr class="mt-1" />
          </li>
        </ul>
      </div>

      <div class="accesos-rapidos mt-4">
        <ul class="p-0">
          <li class="m-0">
            <a style="cursor:pointer"><i class="bi bi-toggles"></i> Cerrar cesion</a>
          </li>
        </ul>
      </div>
    </div>
    `;

  const cerrarSesion = section.querySelector('.accesos-rapidos');
  cerrarSesion.onclick = async () => {
    try {
      const data = await logoutPage();

      if (data) {
        // Show spinner
        showSpinner();
        // Remove token
        localStorage.removeItem('token');
        redirecToPage(includePathUser() ? URLS_APP.LOGIN_USER : URLS_APP.LOGIN_CLINIC);
      }
    } catch (error) {
      console.log(error);
    }



  }

  return section;

};

export default sidebar;



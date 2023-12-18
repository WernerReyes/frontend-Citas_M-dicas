import './header.css';

import URLS_APP from '../../../../urls-app';

import { profileLink, includePathUser } from '../../../../utils/common';

const header = () => {
  const header = document.createElement('header');
  header.id = 'header-private';
  header.classList.add('fixed-top');
  header.innerHTML = `
    <nav class="navbar navbar-expand">
      <div class="container-fluid">
        <div class="d-flex align-items-center nombre-clinica">
          <img src="/assets/img/UserImages/logo2.png" class="img-fluid" style="width: 60px" />
          <div class="p-0 ms-2 m-0">
            <h3 class="p-0 m-0" href="#">Cliníca</h3>
            <p class="p-0 m-0" href="#">Esperanza</p>
          </div>
        </div>

        <div class="d-flex w-100">
          <ul class="navbar-nav me-auto mb-2 mb-sm-0 w-100 mx-auto d-md-flex justify-content-center">
            <li class="nav-item">
              <a class="nav-link ${activeLink(includePathUser() ? URLS_APP.HOME_DASHBOARD_USER : URLS_APP.HOME_DASHBOARD_MEDICAL)}" aria-current="page" href="${profileLink(URLS_APP.HOME_DASHBOARD_USER, URLS_APP.HOME_DASHBOARD_MEDICAL)}">Inicio</a>
            </li>
            <li class="nav-item">
              <a class="nav-link ${activeLink(includePathUser() ? URLS_APP.APPOINTMENT_HISTORY_DASHBOARD_USER: URLS_APP.APPOINTMENT_HISTORY_DASHBOARD_MEDICAL)}" href="${profileLink(URLS_APP.APPOINTMENT_HISTORY_DASHBOARD_USER, URLS_APP.APPOINTMENT_HISTORY_DASHBOARD_MEDICAL)}">Mi historial de citas</a>
            </li>
            <li class="nav-item ${!includePathUser() ? 'd-none' : ''}">
              <a class="nav-link ${activeLink(URLS_APP.SEACH_DOCTOR_DASHBOARD_USER)}" href="${URLS_APP.SEACH_DOCTOR_DASHBOARD_USER}">Busca a tu medico</a>
            </li>
          </ul>
          <div class="btn-mas-info d-flex justify-content-end align-items-center">
            <button class="btn btn-primary rounded rounded-circle p-0" type="button" style="width: 50px; height: 50px"
              data-bs-toggle="offcanvas" data-bs-target="#sidebar" aria-controls="offcanvasRight">
              <i class="bi bi-list" style="font-size: 30px"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
    `;
  return header;
};

export default header;

// Desc: Add active class to current link
const activeLink = (url) => {
  const path = window.location.pathname;
  // Add active class if path is equal to url
  return path === url ? 'active' : '';
}
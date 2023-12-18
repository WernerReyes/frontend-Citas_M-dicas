import URLS_APP from '../../../../urls-app';
import './header.css';

const header = () => {
    const header = document.createElement('header');
    header.id = 'header';
    header.classList.add('fixed-top');
    header.innerHTML = `
    <div class="container d-flex align-items-center nombre-clinica">

    <div class="d-flex justify-content align-items-center mediaquery">
      <a href="index.html"><img src="../../../assets/img/logoinicio.png" class="img-fluid" style="width: 60px" /></a>
      <div class="p-0 ms-2 m-0 media">
        <h3 class="p-0 m-0" href="#">Cliníca</h3>
        <p class="p-0 m-0 esp" href="#">Esperanza</p>
      </div>
    </div>

    <a href="./index.html" class="logo me-auto"><img></a>

    <nav id="navbar" class="navbar order-last order-lg-0">
      <ul>
        <li><a class="nav-link scrollto " href="${URLS_APP.HOME}">Inicio</a></li>
        <li><a class="nav-link scrollto" href="${URLS_APP.ABOUT}">Nosotros</a></li>
        <li><a class="nav-link scrollto" href="${URLS_APP.CONTACT}">Contactanos</a></li>
      </ul>
      <i class="bi bi-list mobile-nav-toggle"></i>
    </nav>

    <a href="${URLS_APP.REGISTER}" class="appointment-btn scrollto text-decoration-none">Registrarse</a>
    <a href="${URLS_APP.LOGIN_USER}" class="appointment-btn scrollto text-decoration-none">Iniciar Sesión</a>
  </div>
        `;
    return header;
}

export default header;
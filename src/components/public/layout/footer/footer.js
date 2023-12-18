import './footer.css';

import URLS_APP from '../../../../urls-app';

const footer = () => {
    const footer = document.createElement('footer');
    footer.id = 'footer';
    footer.className = 'footer';
    footer.innerHTML = `
        <div class="footer-top">
            <div class="container">
                <div class="row">
                    <div class="col-lg-3 col-md-6 footer-links">
                        <div class="d-flex justify-content align-items-center text-center nombre-clinica">
                            <a href="index.html"><img src="/assets/img/logoinicio.png" class="img-fluid" style="width: 60px" /></a>
                            <div class="p-0 ms-2 m-0 ">
                                <h3 class="p-0 m-0" href="#">Cliníca</h3>
                                <p class="p-0 m-0 " href="#">Esperanza</p>
                            </div>
                        </div>
                        <a href="${URLS_APP.LOGIN_USER}" class="btn-apm appointment-btn scrollto mt-4">Reserva una cita</a>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="footer-info">
                            <h3>Clinica Esperanza</h3>
                            <p>
                A108 Calle Santa Anita <br>
                N° 535, PERÚ<br><br>
                <strong>Telf:</strong> +(08) 800 12 200<br>
                <strong>Correo:</strong> clinicaesperanza@gmail.com<br>
              </p>
              <div class="social-links mt-3">
                <a href="https://twitter.com/" class="twitter"><i class="bx bxl-twitter"></i></a>
                <a href="https://facebook.com" class="facebook"><i class="bx bxl-facebook"></i></a>
                <a href="https://www.instagram.com/" class="instagram"><i class="bx bxl-instagram"></i></a>
                <a href="https://www.linkedin.com/" class="linkedin"><i class="bx bxl-linkedin"></i></a>
              </div>
            </div>
          </div>

          <div class="col-lg-2 col-md-6 footer-links">
            <h4 class="text-left"> </h4>
            <ul class="text-center">
              <li><i class="bx bx-chevron-right"></i> <a href="${URLS_APP.HOME}">Inico</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="${URLS_APP.ABOUT}">Nosotros</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="${URLS_APP.CONTACT}">Contactanos</a></li>
            </ul>
          </div>

          <div class="col-lg-3 col-md-6 footer-links">
            <h4> </h4>
            <div class="text-center">
              <ul>
                <li><i class="bx bx-chevron-right"></i> <a href="https://www.gob.pe/anpd">Proteccion de datos</a></li>
                <li><i class="bx bx-chevron-right"></i> <a href="https://www.paho.org/es/oficina-etica">Centro de ayuda de etica</a></li>
                <li><i class="bx bx-chevron-right"></i> <a href="https://acortar.link/RfC7Ap">Declaracion de beneficiario</a></li>
                <li><i class="bx bx-chevron-right"></i> <a href="https://www.clinica-galatea.com/es/aviso-legal/">Avisos Legales</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="credits">
        <p>Diseñado por estudiantes de tercer ciclo Tecsup</p>
      </div>
    </div>`;

    return footer;
};



export default footer;
import './cta-section.css';

import URLS_APP from "../../../../urls-app";

const ctaSection = () => {
    const section = document.createElement('section');
    section.id = 'cta';
    section.classList.add('cta');
    section.innerHTML = `
        <div class="container" data-aos="zoom-in">
            <div class="text-center">
                <h3>¿En una emergencia? ¿Necesitas ayuda ahora?</h3>
                <p>Enfrentando una emergencia médica? Estamos aquí para ayudarte. Contáctanos de inmediato para recibir
                    asistencia profesional y atención urgente que marcará la diferencia cuando más lo necesitas.</p>
                <a class="cta-btn scrollto text-decoration-none" href="${URLS_APP.CONTACT}">Contactanos</a>
            </div>
        </div>
    `;
    return section;
};

export default ctaSection;
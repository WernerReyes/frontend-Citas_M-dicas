import './about-section.css';

const aboutSection = () => {
    const section = document.createElement('section');
    section.id = 'about';
    section.classList.add('about');
    section.innerHTML = `
        <div class="container" data-aos="fade-up">
            <div class="section-title">
                <h2>Sobre Nosotros</h2>
                <p>En <strong>Clinica Esperanza</strong>, estamos comprometidos a simplificar tu búsqueda y programación de citas médicas. Nuestra plataforma conecta a pacientes con profesionales de la salud en un proceso sin complicaciones.</p>
            </div>
            <div class="row">
                <div class="col-lg-6" data-aos="fade-right">
                    <img src="/assets/img/about.jpg" class="img-fluid" alt="">
                </div>
                <div class="col-lg-6 pt-4 pt-lg-0 content" data-aos="fade-left">
                    <h3>Clinica Esperanza</h3>
                    <ul>
                        <li><i class="bi bi-check-circle"></i>Somos un equipo dedicado a mejorar tu acceso a la atención médica. Nuestra misión es facilitar la gestión de citas, ahorrándote tiempo y preocupaciones. Busca, elige un especialista y programa tu cita en segundos.</li>
                        <li><i class="bi bi-check-circle"></i>Valoramos tu privacidad y comodidad. Recibirás recordatorios de citas para mantenerte al tanto de tus compromisos médicos. Confía en nosotros para hacer que tu experiencia de atención médica sea más sencilla.</li>
                        <li><i class="bi bi-check-circle"></i>Únete a <strong>Clinica Esperanza</strong> y empieza a disfrutar de un proceso de programación de citas médicas más fácil y eficiente.</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
    return section;

};

export default aboutSection;
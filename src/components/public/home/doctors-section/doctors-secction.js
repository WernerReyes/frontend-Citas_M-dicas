import './doctors-section.css';

const doctorsSeccion = () => {
    const section = document.createElement('section');
    section.id = 'doctors';
    section.classList.add('doctors', 'section-bg');
    section.innerHTML = `
        <div class="container" data-aos="fade-up">
            <div class="section-title">
                <h2>Doctores</h2>
                <p>"Conoce a nuestro equipo de médicos especializados comprometidos con tu bienestar. Desde atención
                    preventiva hasta
                    tratamientos especializados, ofrecemos cuidado médico de calidad. Explora perfiles para encontrar el experto
                    adecuado
                    para ti y comienza tu camino hacia la salud óptima."</p>
            </div>
            <div class="row">
                ${doctors()}
            </div>
        </div>
    `;
    return section;
};

export default doctorsSeccion;

const doctorsContent = [
    {
        image: '/assets/img/doctors/doctors-1.jpg',
        name: 'Walter White',
        specialty: 'Cirujano'
    },
    {
        image: '/assets/img/doctors/doctors-2.jpg',
        name: 'Sarah Jhonson',
        specialty: 'Anestesiologo'
    },
    {
        image: '/assets/img/doctors/doctors-3.jpg',
        name: 'William Anderson',
        specialty: 'Cardiologo'
    },
    {
        image: '/assets/img/doctors/doctors-4.jpg',
        name: 'Amanda Jepson',
        specialty: 'Neurosirujano'
    }
];

const doctors = () => {
    const doctors = document.createElement('div');
    doctorsContent.forEach(doctor => {
        const doctorItem = document.createElement('div');
        doctorItem.className = 'col-lg-3 col-md-6 d-flex align-items-stretch';
        doctorItem.innerHTML = `
            <div class="member" data-aos="fade-up" data-aos-delay="100">
                <div class="member-img">
                    <img src="${doctor.image}" class="img-fluid" alt="">
                    <div class="social">
                        <a href=""><i class="bi bi-twitter"></i></a>
                        <a href=""><i class="bi bi-facebook"></i></a>
                        <a href=""><i class="bi bi-instagram"></i></a>
                        <a href=""><i class="bi bi-linkedin"></i></a>
                    </div>
                </div>
                <div class="member-info">
                    <h4>${doctor.name}</h4>
                    <span>${doctor.specialty}</span>
                </div>
            </div>
        `;
        doctors.appendChild(doctorItem);
    });
    return doctors.innerHTML;
};

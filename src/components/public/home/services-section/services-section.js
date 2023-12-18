import './services-section.css';

const servicesSection = () => {
    const section = document.createElement('section');
    section.id = 'services';
    section.classList.add('services');
    section.innerHTML = `
        <div class="container" data-aos="fade-up">
            <div class="section-title">
                <h2>Servicios</h2>
                <p>Ofrecemos servicios médicos especializados que van desde el cuidado del corazón y la piel hasta la salud
                    mental,
                    musculoesquelética, ocular y reproductiva femenina. Tu bienestar es nuestra prioridad.</p>
            </div>
            <div class="row">
                ${services()}
            </div>
        </div>
    `;

    return section;
};

export default servicesSection;

const servicesContent = [
    {
        title: 'Cardiologia',
        description: 'Especialidad médica que se enfoca en el diagnóstico y tratamiento de enfermedades relacionadas con el corazón y el sistema cardiovascular.',
        image: '/assets/img/agregadas/cardiologia.jpg'
    },
    {
        title: 'Ginecologia',
        description: 'Salud reproductiva de las mujeres, abordando temas como el sistema reproductivo, embarazo, parto, y cuidado de la salud femenina en general.',
        image: '/assets/img/agregadas/Ginecologia.png'
    },
    {
        title: 'Dermatologia',
        description: 'Rama de la medicina que se ocupa de la salud de la piel, cabello y uñas, abordando condiciones dermatológicas y ofreciendo tratamientos estéticos.',
        image: '/assets/img/agregadas/dermatologia.jpg'
    },
    {
        title: 'Oftalmologia',
        description: 'Especialidad médica para diagnosticar, tratar y corregir problemas oculares y visuales, incluyendo cirugía y prescripción de lentes.',
        image: '/assets/img/agregadas/oftalmologia.jpg'
    },
    {
        title: 'Ortopedia',
        description: 'Especialidad médica que se ocupa de los trastornos del sistema musculoesquelético, incluyendo huesos, articulaciones, músculos, ligamentos y tendones.',
        image: '/assets/img/agregadas/ortopedia.jpg'
    },
    {
        title: 'Psicologia',
        description: 'Disciplina que estudia el comportamiento y los procesos mentales, brindando apoyo emocional, diagnóstico y tratamiento de trastornos mentales.',
        image: '/assets/img/agregadas/psicologia.jpg'
    }
];


const services = () => {

    const content = document.createElement('div');

    servicesContent.forEach(item => {
        const service = document.createElement('div');
        service.classList.add('col-lg-4', 'col-md-6', 'icon-box');
        service.setAttribute('data-aos', 'zoom-in');
        service.setAttribute('data-aos-delay', '300');
        service.innerHTML = `
            <div class="mb-3 img-inicio">
                <img src="${item.image}" alt="">
            </div>
            <h4 class="title"><a href="">${item.title}</a></h4>
            <p class="description">${item.description}</p>
        `;

        content.appendChild(service);
    });

    return content.innerHTML;
};

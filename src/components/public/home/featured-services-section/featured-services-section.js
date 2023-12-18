import './featured-services-section.css';

const featuredServicesSection = () => {
    const section = document.createElement('section');
    section.id = 'featured-services';
    section.classList.add('featured-services');
    section.innerHTML = `
        <div class="container" data-aos="fade-up">
            <div class="row">
                <h2 class="text-center mb-4 text-primary fw-bold">Clinica Esperanza cuida de ti</h2>
                ${featuresContent()}
            </div>
        </div>
    `;

    return section;
}

export default featuredServicesSection;


const featuredServices = [
    {
        image: '/assets/img/agregadas/image-01.png',
        title: 'Importancia de la consultoría en lactancia materna',
        description: '¿Estás pensando amamantar a tu bebé, pero no sabes bien cómo hacerlo?'
    },
    {
        image: '/assets/img/agregadas/image-02.png',
        title: 'Síntomas y tratamientos de la faringitis',
        description: 'En la mayoría de los casos, la faringitis se resuelve por sí sola, pero en otros hay infección y malestar que suponen infección.'
    },
    {
        image: '/assets/img/agregadas/image-03.jpg',
        title: 'Hernia umbilical complicaciones y como tratarla',
        description: 'Una hernia umbilical es una condición en la que se produce un abultamiento y disconfort en el área del ombligo.'
    },
    {
        image: '/assets/img/agregadas/image-04.png',
        title: '¿Qué es el Guillain Barré y cómo prevenirlo?',
        description: 'Se siente como una falta de fuerza o debilidad muscular progresiva que va subiendo desde los pies al resto del cuerpo.'
    }
];

const featuresContent = () => {

    const features = document.createElement('div');


    featuredServices.forEach(service => {
        const feature = document.createElement('div');
        feature.className = ('col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0');
        feature.innerHTML = `
                    <div class="icon-box" data-aos="fade-up" data-aos-delay="100">
                        <div class="mb-3 img-inicio">
                            <img src="${service.image}" alt="">
                        </div>
                        <h4 class="title"><a href="" class="text-decoration-none">${service.title}</a></h4>
                        <p class="description">${service.description}</p>
                    </div>
       `;
        features.appendChild(feature);
    });

    return features.innerHTML;
};

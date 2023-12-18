import URLS_APP from '../../../../urls-app';
import './hero.css';

const heroSection = () => {
    const section = document.createElement('section');
    section.id = 'hero';
    section.innerHTML = `
        <div id="heroCarousel" data-bs-interval="5000" class="carousel slide carousel-fade" data-bs-ride="carousel">

            <ol class="carousel-indicators" id="hero-carousel-indicators"></ol>

            <div class="carousel-inner" role="listbox">
                ${carouselIndicators()}
            </div>

            <a class="carousel-control-prev text-decoration-none" href="#heroCarousel" role="button" data-bs-slide="prev">
                <span class="carousel-control-prev-icon bi bi-chevron-left" aria-hidden="true"></span>
            </a>

            <a class="carousel-control-next text-decoration-none" href="#heroCarousel" role="button" data-bs-slide="next">
                <span class="carousel-control-next-icon bi bi-chevron-right" aria-hidden="true"></span>
            </a>

        </div>
    `;

    return section;
}


export default heroSection;


const contentCarousel = [
    {
        title: 'Bienvenido a Clinica esperanza',
        description: 'Nuestra misión es promover la salud y la calidad de vida a través de un equipo médico altamente calificado y tecnología de vanguardia.',
        image: '/assets/img/slide/slide-1.jpg'
    },
    {
        title: 'Bienvenido a Clinica esperanza',
        description: 'Nuestra misión es promover la salud y la calidad de vida a través de un equipo médico altamente calificado y tecnología de vanguardia.',
        image: '/assets/img/slide/slide-2.jpg'
    },
    {
        title: 'Bienvenido a Clinica esperanza',
        description: 'Nuestra misión es promover la salud y la calidad de vida a través de un equipo médico altamente calificado y tecnología de vanguardia.',
        image: '/assets/img/slide/slide-3.jpg'
    }
];

const carouselIndicators = () => {
    const carouselInner = document.createElement('div');

    contentCarousel.forEach((item, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        if (index === 0) {
            carouselItem.classList.add('active');
        }
        carouselItem.style.backgroundImage = `url(${item.image})`;
        carouselItem.innerHTML = `
        <div class="container">
        <h2>Bienvenido a <span>${item.title}</span></h2>
        <p>${item.description}</p>
        <a href="${URLS_APP.LOGIN_USER}" class="btn-get-started scrollto text-decoration-none">Reserva una cita</a>
        </div>
        `
        carouselInner.appendChild(carouselItem);

    });

    return carouselInner.innerHTML;
};


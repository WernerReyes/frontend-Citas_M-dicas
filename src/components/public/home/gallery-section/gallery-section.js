import './gallery-section.css';

const galerySection = () => {
    const section = document.createElement('section');
    section.id = 'gallery';
    section.classList.add('gallery');
    section.innerHTML = `
        <div class="container" data-aos="fade-up">
            <div class="section-title">
                <h2>Galeria</h2>
                <p>Explora nuestra galería de imágenes, reflejando el compromiso de nuestro equipo médico y la atención cálida que
                    ofrecemos en cada cita. Descubre momentos detrás de escena que destacan nuestro enfoque dedicado hacia tu
                    bienestar.
                    Bienvenido a un vistazo visual a la experiencia única de nuestras citas médicas.</p>
            </div>
            <div class="gallery-slider swiper">
                <div class="swiper-wrapper align-items-center">
                    ${gallery()}
                </div>
                <div class="swiper-pagination"></div>
            </div> 
        </div>
    `;
    return section;
};

export default galerySection;

const galleryContent = [
    {
        image: '/assets/img/gallery/gallery-1.jpg'
    },
    {
        image: '/assets/img/gallery/gallery-2.jpg'
    },
    {
        image: '/assets/img/gallery/gallery-3.jpg'
    },
    {
        image: '/assets/img/gallery/gallery-4.jpg'
    },
    {
        image: '/assets/img/gallery/gallery-5.jpg'
    },
    {
        image: '/assets/img/gallery/gallery-6.jpg'
    },
    {
        image: '/assets/img/gallery/gallery-7.jpg'
    },
    {
        image: '/assets/img/gallery/gallery-8.jpg'
    }
];

const gallery = () => {
    const gallery = document.createElement('div');
    galleryContent.forEach(galleryItem => {
        const galleryItemContent = document.createElement('div');
        galleryItemContent.className = 'swiper-slide';
        galleryItemContent.innerHTML = `
            <a class="gallery-lightbox" href="${galleryItem.image}">
                <img src="${galleryItem.image}" class="img-fluid" alt="">
            </a>
        `;
        gallery.appendChild(galleryItemContent);
    });
    return gallery.innerHTML;
};



import './testimonials-section.css';

const testimonialsSection = () => {
    const section = document.createElement('section');
    section.id = 'testimonials';
    section.classList.add('testimonials');
    section.innerHTML = `
        <div class="container" data-aos="fade-up">
            <div class="section-title">
                <h2>Testimonios</h2>
                <p>Descubre las experiencias transformadoras de nuestros pacientes. Lee testimonios reales que destacan la calidad de
                    nuestro cuidado médico y cómo hemos impactado positivamente en sus vidas.</p>
            </div>
            <div class="testimonials-slider swiper" data-aos="fade-up" data-aos-delay="100">
                <div class="swiper-wrapper">
                    ${testimonials()}
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </div>
    `;

    return section;
};

export default testimonialsSection;

const testimonialsContent = [
    {
        image: '/assets/img/testimonials/testimonials-1.jpg',
        name: 'Saul Goodman',
        testimonial: 'La Clínica Esperanza ha sido mi refugio de confianza durante años. Su equipo médico excepcional y sus instalaciones modernas hacen que cada visita sea cómoda. Me siento agradecida por la atención personalizada y el compromiso constante con mi bienestar.'
    },
    {
        image: '/assets/img/testimonials/testimonials-2.jpg',
        name: 'Sara Wilsson',
        testimonial: 'He experimentado una calidad de atención incomparable en la Clínica Esperanza. Desde el primer día, el personal ha demostrado un nivel excepcional de profesionalismo y calidez. Gracias a ellos, me siento respaldado en cada paso de mi viaje hacia la salud óptima.'
    },
    {
        image: '/assets/img/testimonials/testimonials-3.jpg',
        name: 'Jena Karlis',
        testimonial: 'La dedicación de la Clínica Esperanza hacia la excelencia médica es evidente en cada interacción. El equipo va más allá para garantizar que cada paciente se sienta escuchado y cuidado. ¡No podría recomendarlos lo suficiente!'
    },
    {
        image: '/assets/img/testimonials/testimonials-4.jpg',
        name: 'Matt Brandon',
        testimonial: 'Como paciente de la Clínica Esperanza, he experimentado un estándar de atención que redefine la calidad. Su enfoque integral y el trato humano me han brindado la confianza necesaria para abordar mis preocupaciones de salud.'
    },
    {
        image: '/assets/img/testimonials/testimonials-5.jpg',
        name: 'John Larson',
        testimonial: 'La Clínica Esperanza no solo trata enfermedades; crean experiencias de atención. La empatía del personal y la eficacia en el diagnóstico y tratamiento me han dejado impresionado. Si buscas atención médica que realmente marque la diferencia, esta es tu clínica.'
    }
];

const testimonials = () => {
    const testimonials = document.createElement('div');
    testimonialsContent.forEach(testimonial => {
        const testimonialItem = document.createElement('div');
        testimonialItem.className = 'swiper-slide';
        testimonialItem.innerHTML = `
            <div class="testimonial-item">
                <p>
                    <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                    ${testimonial.testimonial}
                    <i class="bx bxs-quote-alt-right quote-icon-right"></i>
                </p>
                <img src="${testimonial.image}" class="testimonial-img" alt="">
                <h3>${testimonial.name}</h3>
            </div>
        `;

        testimonials.appendChild(testimonialItem);
    });

    return testimonials.innerHTML;
};



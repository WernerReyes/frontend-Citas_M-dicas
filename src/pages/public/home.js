import {
    headerPublic,
    featuredServicesSection,
    heroSection,
    ctaSection,
    servicesSection,
    testimonialsSection,
    doctorsSeccion,
    galerySection,
    footerPublic,
    preloader
} from "../../components/public";
import { topBar } from '../../components/common';

import { mainScript } from '../../utils/scripts';


const homePage = container => {

    // Create the topbar and header components
    const topbar = topBar();
    const header = headerPublic();

     // Hero section
     const hero = heroSection();

    // <--! Content -->
    
    // Main container
    const main = document.createElement('main');
    main.id = 'main';
    const featuredServices = featuredServicesSection();
    const cta = ctaSection();
    const services = servicesSection();
    const testimonials = testimonialsSection();
    const doctors = doctorsSeccion();
    const galery = galerySection();
    // Append content to main
    main.appendChild(featuredServices);
    main.appendChild(cta);
    main.appendChild(services);
    main.appendChild(testimonials);
    main.appendChild(doctors);
    main.appendChild(galery);

    // --> Content <--

    // Create the footer component
    const footer = footerPublic();

    // Create the preloader component
    const preload = preloader();

    // Create a document fragment
    const fragment = document.createDocumentFragment();
    fragment.appendChild(topbar);
    fragment.appendChild(header);
    fragment.appendChild(hero);
    fragment.appendChild(main);
    fragment.appendChild(footer);
    fragment.appendChild(preload);

    // Load scripts
    document.body.appendChild(mainScript());

    // Append content to container
    container.appendChild(fragment);
    
};

export default homePage;
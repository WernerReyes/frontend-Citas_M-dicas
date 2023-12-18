import { topBar } from "../../components/common";
import { aboutSection, footerPublic, headerPublic, heroSection, preloader, sedesSection } from "../../components/public";
import { mainScript } from "../../utils/scripts";

const aboutPage = container => {
    // Create the topbar and header components
    const topbar = topBar();
    const header = headerPublic();

    // Hero section
    const hero = heroSection();

    // <--! Content -->
    
    const main = document.createElement('main');
    main.id = 'main';
    const about = aboutSection();
    const sedes = sedesSection();
    main.appendChild(about);
    main.appendChild(sedes);
    
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

export default aboutPage;
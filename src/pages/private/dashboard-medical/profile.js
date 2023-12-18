import { spinnerCarga, topBar } from "../../../components/common";
import { footerPrivate, headerPrivate, profileInformationSection, sidebarPrivate } from "../../../components/private";
import { verifyTokenUtil } from "../../../utils/verifyToken";

const profileDashboardMedicalPage = async(container) => {
    container.className = 'min-vh-100 d-flex flex-column justify-content-between';
    if(document.getElementById('main-perfil')) return;
    try {
        // Verify token and get medical data
        const doctor = await verifyTokenUtil();

        // Create the topbar, header and sidebar components
        const topbar = topBar();
        const header = headerPrivate();
        const sidebar = sidebarPrivate(doctor);


        // <--! Content -->
        const main = document.createElement('main');
        main.id = 'main-perfil';
        main.classList.add('container','px-4', 'mb-4');
        const profileInformation = profileInformationSection(doctor);
        main.appendChild(profileInformation);

        // --> Content <--

        // Create the footer component
        const footer = footerPrivate();

        // Create the spinner component
        const spinner = spinnerCarga();

        // Create a document fragment
        const fragment = document.createDocumentFragment();
        fragment.appendChild(topbar);
        fragment.appendChild(header);
        fragment.appendChild(sidebar);
        fragment.appendChild(main);
        fragment.appendChild(footer);
        fragment.appendChild(spinner);
    
        // Add fragment to container
        container.appendChild(fragment);

        // Load scripts
        // container.appendChild(mainScript());
    } catch (error) {
        throw error;
    }
};

export default profileDashboardMedicalPage;
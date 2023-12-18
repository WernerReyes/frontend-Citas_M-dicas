import { topBar, modalBase, spinnerCarga } from "../../../components/common";
import { actionsSection, appointmentsSection, footerPrivate, headerPrivate, sidebarPrivate } from "../../../components/private";
import { verifyTokenUtil } from "../../../utils/verifyToken";


const homeDashboardUserPage = async (container) => {
    container.className = 'min-vh-100 d-flex flex-column justify-content-between';
    if(document.getElementById('main')) return;
    try {
        // Verify token and get user data
        const user = await verifyTokenUtil();

        // Create the topbar, header and sidebar components
        const topbar = topBar();
        const header = headerPrivate();
        const sidebar = sidebarPrivate(user);


        // <--! Content -->
       
        const main = document.createElement('main');
        main.id = 'main';
        const actions = actionsSection(user);
        const appointments =  await appointmentsSection(user);
        main.appendChild(actions);
        main.appendChild(appointments);
    
        // --> Content <--

        // Create the footer component
        const footer = footerPrivate();

        // Create the modal component
        const modal = modalBase('agendar-cita-modal');

        // Create the spinner component
        const spinner = spinnerCarga();


        // Create a document fragment
        const fragment = document.createDocumentFragment();
        fragment.appendChild(topbar);
        fragment.appendChild(header);
        fragment.appendChild(sidebar);
        fragment.appendChild(main);
        fragment.appendChild(footer);
        fragment.appendChild(modal);
        fragment.appendChild(spinner);

        // Add fragment to container
        container.appendChild(fragment);

        // Load scripts
        // container.appendChild(mainScript());
    } catch (error) {
        throw error;
    }

};

export default homeDashboardUserPage;
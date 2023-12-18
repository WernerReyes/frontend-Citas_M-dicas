import { modalBase, spinnerCarga, topBar } from "../../../components/common";
import { footerPrivate, headerPrivate, searchDoctorSection, servicesSection, sidebarPrivate } from "../../../components/private";
import { verifyTokenUtil } from "../../../utils/verifyToken";

const seachDoctorDashboardUserPage = async(container) => {
    container.className = 'min-vh-100 d-flex flex-column justify-content-between';
    if(document.getElementById('main-history')) return;
    try {
        // Verify token and get user data
        const user = await verifyTokenUtil();

        // Create the topbar, header and sidebar components
        const topbar = topBar();
        const header = headerPrivate();
        const sidebar = sidebarPrivate(user);


        // <--! Content -->

        const main = document.createElement('main');
        main.id = 'main-history';
        main.classList.add('container', 'fondo', 'px-4', 'mb-4');

        // Create a row
        const row = document.createElement('div');
        row.classList.add('row');

        const searchDoctor = await searchDoctorSection(user);
        const services = servicesSection(user);
       
        // Append sections to row
        row.appendChild(searchDoctor);
        row.appendChild(services);
        // Append row to main
        main.appendChild(row);


        // --> Content <--

        // Create the footer component
        const footer = footerPrivate();

        // Create the spinner component
        const spinner = spinnerCarga();

        // Create the modal component
        const modal = modalBase('agendar-cita-modal');


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

export default seachDoctorDashboardUserPage;
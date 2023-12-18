import { modalBase, spinnerCarga } from "../../../components/common";
import { manageAppointmentsSection, sidebarAdministator } from "../../../components/private";
import { verifyTokenUtil } from "../../../utils/verifyToken";

const manageAppointmentsDashboardAdministratorPage = async(container) => {
    container.className = 'container-fluid overflow-hidden';
    if (document.getElementById('main-manage-appointments')) return;
    try {
        // Verify token and get user data
        const doctor = await verifyTokenUtil();

        // Create the sidebar component
        const sidebar = sidebarAdministator();

        const flexWrapper = document.createElement('div');
        flexWrapper.classList.add('row', 'flex-nowrap', 'min-vh-100');

        // <--! Content -->

        const main = document.createElement('main');
        main.id = 'main-manage-appointments';
        main.classList.add('col-9', 'col-sm-8', 'col-md-10');

        const manage = await manageAppointmentsSection();

        main.appendChild(manage);

        // --> Content <--
        
        // Add sidebar and main to flexWrapper
        flexWrapper.appendChild(sidebar);
        flexWrapper.appendChild(main);

        // Create the modal component
        const modal = modalBase('view-appointment-modal');
        
        // Create the spinner component
        const spinner = spinnerCarga();

        // Create a document fragment
        const fragment = document.createDocumentFragment();
        fragment.appendChild(flexWrapper);
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

export default manageAppointmentsDashboardAdministratorPage;
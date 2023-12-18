import URLS_APP from "../../../../urls-app";

// Historial de citas
const appointmentHistory = () => {
    const container = document.createElement('div');
    container.className = 'd-flex flex-column justify-content-center align-items-center';
    container.innerHTML = `
            <a href="${URLS_APP.APPOINTMENT_HISTORY_DASHBOARD_USER}">
                <img src="/assets/img/UserImages/app-logo2.png" class="img-fluid" width="70px" />
                <p class="mt-2">Historial de citas</p>
            </a>
    `;
    return container;
};

export default appointmentHistory;
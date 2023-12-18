import URLS_APP from "../../../../urls-app";

// Buscar medico
const searchDoctor = () => {
    const container = document.createElement('div');
    container.className = 'd-flex flex-column justify-content-center align-items-center';
    container.innerHTML = `
            <a href="${URLS_APP.SEACH_DOCTOR_DASHBOARD_USER}">
                <img src="/assets/img/UserImages/app-logo3.png" class="img-fluid" width="70px" />
                <p class="mt-2">Busca a tu médico</p>
            </a>
    `;
    return container;
}

export default searchDoctor;

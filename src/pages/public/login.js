import { spinnerCarga } from "../../components/common";
import { formLoginSection } from "../../components/public";

const loginPage = (container, rol) => {
    container.style.backgroundImage = 'url(/assets/img/FormImages/fondo-v2.png)';
    container.className = ('d-flex justify-content-center align-items-center min-vh-100')

    // <--! Content -->
    const main = document.createElement('main');
    main.classList.add('p-5');
    main.id = 'main-register';
    const row = document.createElement('div');
    row.classList.add('row');

    const firstColum = document.createElement('div');
    firstColum.classList.add('col-md-6', 'first-colum');
    firstColum.innerHTML = '<img src="/assets/img/FormImages/imgLogin.png" alt="login form" class="img-fluid">';

    const secondColum = document.createElement('div');
    secondColum.className = ('col-md-6 d-flex justify-content-center align-items-center');
    const form = formLoginSection(rol); // In this section we send the login form to the backend
    secondColum.appendChild(form)

    // Add to row
    row.appendChild(firstColum);
    row.appendChild(secondColum);

    main.appendChild(row);
    // --> Content <--

    // Spinner
    const spinner = spinnerCarga();

    // Create a document fragment
    const fragment = document.createDocumentFragment();
    fragment.appendChild(main);
    fragment.appendChild(spinner);

    // Add to container
    container.appendChild(fragment);
}

export default loginPage;
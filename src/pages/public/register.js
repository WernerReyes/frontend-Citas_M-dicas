import { formRegisterSection } from "../../components/public";
import URLS_APP from "../../urls-app";

const registerPage = (container) => {
  container.style.backgroundImage = 'url(/assets/img/FormImages/fondo-v2.png)';
  container.className = ('d-flex justify-content-center align-items-center min-vh-100')

    // <--! Content -->
    const main = document.createElement('main');
    main.classList.add('p-5');
    main.id = 'main-register';
    const row = document.createElement('div');
    row.classList.add('row');

    const firstColum = document.createElement('div');
    firstColum.classList.add('col-md-6');
    const form = formRegisterSection(); // In this section we send the register form to the backend
    firstColum.appendChild(form)

    const secondColum = document.createElement('div');
    secondColum.classList.add('col-md-6','second-colum');
    secondColum.innerHTML = '<img src="/assets/img/FormImages/imgRegistro.png" alt="login form" class="img-fluid">';
    
    // Question
    const divQuestion = document.createElement('div');
    divQuestion.classList.add('d-flex','justify-content-around')
    divQuestion.innerHTML = `
      <p class="mb-2 pb-lg-2">¿Ya tienes una cuenta? <a class="text-decoration-none ms-4"
        href="${URLS_APP.LOGIN_USER}">Acceder.</a>
      </p> 
    `
    

    row.appendChild(firstColum);
    row.appendChild(secondColum);

    main.appendChild(row);
    main.appendChild(divQuestion);
    
    // --> Content <--

    // Create a document fragment
    const fragment = document.createDocumentFragment();
    fragment.appendChild(main);
    
    // Add to container
    container.appendChild(fragment);

}

export default registerPage;
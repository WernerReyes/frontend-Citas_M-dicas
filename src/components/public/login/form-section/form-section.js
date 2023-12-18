import './form-section.css';

import { createInput, showSpinner } from "../../../common";
import validations from '../../../../validations-inputs';
import { createSubmitInput } from "../../../common/inputs/submit-input";
import { validateInputs } from "../../../../utils/validations";
import URLS_APP from '../../../../urls-app';
import { loginClinicStaff, loginUser } from '../../../../services/api/auth';
import { showAlert } from '../../../common/alerts/alerts';
import { redirecToPage, saveToken } from '../../../../utils/common';

const formLoginSection = (rol) => {
  const section = document.createElement('section');
  section.className = 'row d-flex justify-content-center align-items-center';

  const title = document.createElement('h2');
  title.classList.add('text-center')
  title.textContent = 'Acceso';

  const subTitle = document.createElement('p');
  subTitle.classList.add('text-center')
  subTitle.textContent = 'Ingresa tus datos para iniciar sesión';

  // Create form
  const form = document.createElement('form');
  form.id = 'formulario';
  form.dataset.role = rol;

  // <-- VALIDATIOS -->
  const { correo, password } = validations;

  const userEmailInput = createInput({ id: 'email', placeholder: 'Tu correo electrónico', validations: correo, classes: 'mb-3 col-12', labelText: 'Correo' });

  const divPassword = document.createElement('div');
  const userPasswordInput = createInput({ id: 'password', placeholder: 'Tu contraseña', validations: password, classes: 'col-12', type: 'password', labelText: 'Contraseña' });
  // const olvidePassword = document.createElement('a');
  // olvidePassword.classList.add('text-decoration-none', 'd-block', 'mt-0', 'pt-0');
  // olvidePassword.textContent = '¿Olvidaste tu contraseña?';
  divPassword.appendChild(userPasswordInput);
  // divPassword.appendChild(olvidePassword);


  // Create button
  const button = createSubmitInput({ value: 'Acceder', divClasses: 'mt-4 text-center', disabled: true });

  // Add inputs to form
  form.appendChild(userEmailInput);
  form.appendChild(divPassword);
  form.appendChild(button);

  // Question
  const divQuestion = document.createElement('div');
  divQuestion.classList.add('d-flex', 'justify-content-around', 'mt-3')
  divQuestion.innerHTML = `
      <p class="mb-2 pb-lg-2">¿No tienes una cuenta? <a class="text-decoration-none ms-4"
        href="${URLS_APP.REGISTER}">Registrate aquí</a>
      </p> 
    `

  // Button for login as clinic staff
  const buttonClinic = document.createElement('a');
  buttonClinic.classList.add('btn', 'btn-outline-primary', 'mt-3');
  buttonClinic.textContent = 'Ingresar como personal de la clínica';
  buttonClinic.href = URLS_APP.LOGIN_CLINIC;


  // Validate all inputs to enable button
  let inputs = Array.from(form.querySelectorAll('input'));
  validateInputs(inputs, button.children[0]);

  // Add content to section
  section.appendChild(title);
  section.appendChild(subTitle);
  section.appendChild(form);
  if (rol === 'user') {
    section.appendChild(divQuestion);
    section.appendChild(buttonClinic);
  }

  // Send data to server for login
  form.addEventListener('submit', sendDataServer);

  return section;


}

/*--------------------------------------------------------------
# Send data to server [ PHP ]
--------------------------------------------------------------*/
const sendDataServer = async (e) => {

  e.preventDefault();
  let information = null;

  const data = {
    correo: e.target.email.value,
    password: e.target.password.value,
  };

  try {
    if (e.target.dataset.role === 'user') {
      const response = await loginUser(data);
      information = response;
    } else {
      const response = await loginClinicStaff(data);
      information = response;
    }
    
    // Extract token and rol from response
    const { token, rol } = information;

    // Show spinner
    showSpinner()
    
    // Verify rol to redirecT
    if (rol === 'ADMIN_ROLE') {
      redirecToPage(URLS_APP.HOME_DASHBOARD_ADMINISTRATOR);
    } else if (rol === 'MEDICAL_ROLE') {
     redirecToPage(URLS_APP.HOME_DASHBOARD_MEDICAL);
    } else {
      redirecToPage(URLS_APP.HOME_DASHBOARD_USER);
    }
    
    // Save token in localStorage
    saveToken('token', token);

  } catch ({ status, message }) {
    if (status === 'false') {
      showAlert({ icon: 'error', title: message });
    }
  }
};




export default formLoginSection;
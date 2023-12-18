import './form-contact-section.css';

import validations from '../../../../validations-inputs';
import { createInput, createSubmitInput, createTextAreaInput } from '../../../common';
import { validateInputs } from '../../../../utils/validations';

const formContactSection = () => {
    const seccion = document.createElement('section');
    seccion.id = 'contact';
    seccion.classList.add('contact');
    seccion.innerHTML = `
        <div class="container">
            <div class="section-title">
                <h2>Déjanos tu mensaje</h2>
                <p>Llena el formulario y nuestro equipo responderá a la brevedad.</p>
            </div>
            <div class="row mt-3">
                <div class="col-lg-6">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="info-box">
                                <i class="bx bx-map"></i>
                                <h3>Nuestras direcciones</h3>
                                <p>A108 Calle Santa Anita N° 535, PERÚ</p>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="info-box mt-4">
                                <i class="bx bx-envelope"></i>
                                <h3>Correo electrónico</h3>
                                <p>info@example.com<br>contact@example.com</p>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="info-box mt-4">
                                <i class="bx bx-phone-call"></i>
                                <h3>Teléfono</h3>
                                <p>+1 5589 55488 55<br>+1 6678 254445 41</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                </div>
            </div>
        </div>
    `;

    // Agregamos el formulario a la seccion
    const form = formContact();
    seccion.querySelector('.col-lg-6').nextElementSibling.appendChild(form);

    return seccion;
};

export default formContactSection;


/*--------------------------------------------------------------
# Form Contact
--------------------------------------------------------------*/
const formContact = () => {
    // Get validations
    const { nombre, correo, telefono, mensaje } = validations;

    const form = document.createElement('form');
    form.id = 'contact-form';
    form.classList.add('formulario', 'php-email-form');

    // Create inputs
    const usernameInput = createInput({ id: 'nombre', placeholder: 'Tu nombre', validations: nombre, classes: 'col-md-12' });
    const divRow = document.createElement('div');
    const userPhoneInput = createInput({ id: 'telefono', placeholder: 'Tu teléfono', validations: telefono, classes: 'col-md-6' });
    const userEmailInput = createInput({ id: 'email', placeholder: 'Tu correo electrónico', validations: correo, classes: 'col-md-6' });
    divRow.classList.add('row');
    divRow.appendChild(userPhoneInput);
    divRow.appendChild(userEmailInput);
    const userMessageTextarea = createTextAreaInput('mensaje', 'Tu mensaje', mensaje);

    // Create button
    const button = createSubmitInput({ value: 'Enviar Mensaje', divClasses: 'text-center', disabled: true });

    // Add inputs to form
    form.appendChild(usernameInput);
    form.appendChild(divRow);
    form.appendChild(userMessageTextarea);
    form.appendChild(button);

    // Validate all inputs to enable button
    const inputs = Array.from(form.querySelectorAll('input[type="text"], textarea'));
    validateInputs(inputs, button.children[0]);

    // Send data to server
    form.addEventListener('submit', sendDataServer );

    return form;
};


/*--------------------------------------------------------------
# Send data to server [ PHP ]
--------------------------------------------------------------*/
const sendDataServer = async (e) => {
    e.preventDefault();

    const data = {
        name: e.target.nombre.value,
        phone: e.target.telefono.value,
        email: e.target.email.value,
        message: e.target.mensaje.value,
    };
    
    

    
};




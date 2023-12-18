import './form-section.css';

import { createInput, createSubmitInput } from "../../../common";
import validations from '../../../../validations-inputs';
import { validateInputs } from "../../../../utils/validations";
import { createUser } from '../../../../services/api/user';
import { showAlert, showAlertArray } from '../../../common/alerts/alerts';

const formRegisterSection = () => {
    const section = document.createElement('section');
    section.className = 'row d-flex justify-content-center align-items-center';

    const title = document.createElement('h2');
    title.classList.add('text-center')
    title.textContent = 'Crear cuenta';

    const form = document.createElement('form');
    form.id = 'formulario';

    // <-- VALIDATIOS -->
    const { nombre, dni, apellido, telefono, correo, password } = validations;

    // Create inputs
    const firtRow = document.createElement('div');
    firtRow.classList.add('row');
    const userDniInput = createInput({ id: 'dni', placeholder: 'Tu dni', validations: dni, classes: 'mb-3 col-6', labelText: 'DNI' })
    const userNameInput = createInput({ id: 'nombre', placeholder: 'Tus nombres', validations: nombre, classes: 'mb-3 col-6', labelText: 'Nombres' })
    firtRow.appendChild(userDniInput);
    firtRow.appendChild(userNameInput);

    const secondRow = document.createElement('div');
    secondRow.classList.add('row');
    const userLastNameInput = createInput({ id: 'apellido', placeholder: 'Tus apellidos', validations: apellido, classes: 'mb-3 col-6', labelText: 'Apellidos' })
    const userPhoneInput = createInput({ id: 'telefono', placeholder: 'Tu teléfono', validations: telefono, classes: 'mb-3 col-6', labelText: 'Telefono' });
    secondRow.appendChild(userLastNameInput);
    secondRow.appendChild(userPhoneInput);

    const threedRow = document.createElement('div');
    threedRow.classList.add('row');
    const userEmailInput = createInput({ id: 'email', placeholder: 'Tu correo electrónico', validations: correo, classes: 'mb-3 col-6', labelText: 'Correo' });
    const userPasswordInput = createInput({ id: 'password', placeholder: 'Tu contraseña', validations: password, classes: 'mb-3 col-6', type: 'password', labelText: 'Contraseña' });
    threedRow.appendChild(userEmailInput);
    threedRow.appendChild(userPasswordInput);

    const userAddressInput = createInput({ id: 'address', placeholder: 'Tu dirección', validations: undefined, classes: 'mb-3 col-12', labelText: 'Dirección ( Opcional )' });

    // Create button
    const button = createSubmitInput({ value: 'Crear cuenta', divClasses: 'text-center', disabled: true });

    // Add inputs to form
    form.appendChild(firtRow)
    form.appendChild(secondRow);
    form.appendChild(threedRow);
    form.appendChild(userAddressInput);
    form.appendChild(button);

    // Validate all inputs to enable button
    let inputs = Array.from(form.querySelectorAll('input[type="text"], input[type="password"]'));
    inputs = inputs.filter((_, index) => index < 6);
    validateInputs(inputs, button.children[0]);

    // Add content to section
    section.appendChild(title);
    section.appendChild(form)

    // Send data to server
    form.addEventListener('submit', sendDataServer);

    return section;


}

/*--------------------------------------------------------------
# Send data to server [ PHP ]
--------------------------------------------------------------*/
const sendDataServer = async (e) => {
    e.preventDefault();

    const data = {
        dni: e.target.dni.value,
        nombre: e.target.nombre.value,
        apellido: e.target.apellido.value,
        telefono: e.target.telefono.value,
        correo: e.target.email.value,
        password: e.target.password.value,
        direccion: e.target.address.value,
    };

    try {
        const { message } = await createUser(data);

        showAlert({ icon: 'success', title: message });

        e.target.reset();
    } catch (error) {
        if (error.status === 422) {
            showAlertArray({ icon: 'error', errors: error.data.errors })
        }
    }

};


export default formRegisterSection;
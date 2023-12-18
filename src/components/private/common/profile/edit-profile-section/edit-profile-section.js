import { createInput, createSubmitInput, hideSpinner, showSpinner } from "../../../../common";

import validations from "../../../../../validations-inputs";
import { validateInputs } from "../../../../../utils/validations";
import { updateUser } from "../../../../../services/api/user";
import { showAlert, showAlertArray } from "../../../../common/alerts/alerts";
import { updateUpload, upload } from "../../../../../services/api/upload";
import { includePathUser } from "../../../../../utils/common";
import { updateDoctor } from "../../../../../services/api/doctor";
import URLS_APP from "../../../../../urls-app";
import { updateAdministrator } from "../../../../../services/api/administrator";

const editProfileSection = (user,folder) => {
    console.log(user);
    // <-- USER DATA -->  
    const { id, img: imgUser, dni: dniUser, direccion, nombre: nombreUser, apellido: apellidoUser, telefono: telefonoUser, correo: correoUser, especialidad_id } = user;
    // <-- VALIDATIOS -->
    const { dni, nombre, apellido, telefono, correo } = validations;

    const section = document.createElement('section');
    section.id = 'edit-profile-section';
    section.className = 'row d-flex justify-content-center align-items-center';

    const divCol = document.createElement('div');
    divCol.className = 'col col-xl-9';

    const card = document.createElement('div');
    card.className = 'card mt-5 my-5';
    card.style.borderRadius = '1rem';

    const row = document.createElement('div');
    row.className = 'row g-0';

    const colImg = document.createElement('div');
    colImg.className = 'col-lg-5 col-sm-12 d-flex flex-column align-items-center text-center mt-5';

    const divWrapper = document.createElement('div');
    divWrapper.style.width = '350px';
    divWrapper.style.height = '350px';

    const divImg = document.createElement('div');
    divImg.style.boxShadow = '0px 0px 10px 0px rgba(0,0,0,0.75)';
    divImg.className = 'rounded-circle';
    divImg.style.width = '100%';
    divImg.style.height = '100%';
    divImg.style.overflow = 'hidden';

    const img = document.createElement('img');
    img.classList.add('img-fluid', 'object-fit-fill');
    img.src = imgUser || '/assets/img/sin-perfil.jpg';
    img.style.width = '100%';
    img.style.height = '100%';

    divImg.appendChild(img);
    divWrapper.appendChild(divImg);

    divImg.appendChild(img);

    divImg.appendChild(img);

    const divMb3 = document.createElement('div');
    divMb3.className = 'my-3';

    const inputImage = document.createElement('input');
    inputImage.className = 'form-control form-control-sm';
    inputImage.id = 'formFileSm';
    inputImage.type = 'file';
    inputImage.accept = '.jpeg, .jpg, .png';
    inputImage.onchange = async function () {
        const file = new FormData();
        file.append('file', this.files[0]);

        try {

            // Show spinner
            showSpinner();

            // If user has not image
            if (!imgUser) {
                const { message, user: { img: nuevoImg } } = await upload(file, folder, id, 'images');
                img.src = nuevoImg;
                if(document.getElementById('foto-sidebar')) {
                document.getElementById('foto-sidebar').src = nuevoImg;
                }

                showAlert({ icon: 'success', title: message });
            } else {
                const { message, user: { img: nuevoImg } } = await updateUpload(file, folder, id, 'images');
                img.src = nuevoImg;
                if(document.getElementById('foto-sidebar')) {
                document.getElementById('foto-sidebar').src = nuevoImg;
                }

                showAlert({ icon: 'success', title: message });
            }

            // Hide spinner
            hideSpinner();
            
        } catch ({ data, status }) {
            if (status === 422) {
                showAlertArray({ icon: 'error', errors: data.errors });
            }
        }
    };

    divMb3.appendChild(inputImage);

    // divMt2.appendChild(inputImage);
    colImg.appendChild(divWrapper);
    colImg.appendChild(divMb3);

    const colForm = document.createElement('div');
    colForm.className = 'col-lg-7';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body py-5 px-md-5';

    const form = document.createElement('form');
    form.id = 'formulario';
    form.onsubmit = (e) => sendToServer(e, id, especialidad_id);

    const divTextCenter = document.createElement('div');
    divTextCenter.className = 'text-center mb-4';

    const h1 = document.createElement('h1');
    h1.className = 'fw-bold';
    h1.textContent = 'Editar perfil';

    divTextCenter.appendChild(h1);

    const divRow = document.createElement('div');
    divRow.className = 'row mb-4';

    const divColMd4Dni = document.createElement('div');
    divColMd4Dni.className = 'col-md-4 mb-3';

    const divFormOutlineDni = document.createElement('div');
    divFormOutlineDni.className = 'form-outline';

    // Create input dni
    const userDniInput = createInput({ id: 'dni', placeholder: 'Tu dni', validations: dni, classes: null, labelText: 'DNI' })
    userDniInput.children[1].value = dniUser;
    divFormOutlineDni.appendChild(userDniInput);

    divColMd4Dni.appendChild(divFormOutlineDni);

    const divColMd4Nombre = document.createElement('div');
    divColMd4Nombre.className = 'col-md-4';

    const divFormOutlineNombre = document.createElement('div');
    divFormOutlineNombre.className = 'form-outline';

    // Create input nombre
    const userNameInput = createInput({ id: 'nombre', placeholder: 'Tus nombres', validations: nombre, labelText: 'Nombres' })
    userNameInput.children[1].value = nombreUser;
    divFormOutlineNombre.appendChild(userNameInput);

    divColMd4Nombre.appendChild(divFormOutlineNombre);

    const divColMd4Apellidos = document.createElement('div');
    divColMd4Apellidos.className = 'col-md-4';

    const divFormOutlineApellidos = document.createElement('div');
    divFormOutlineApellidos.className = 'form-outline';

    // Create input apellidos
    const userLastNameInput = createInput({ id: 'apellido', placeholder: 'Tus apellidos', validations: apellido, labelText: 'Apellidos' })
    userLastNameInput.children[1].value = apellidoUser;
    divFormOutlineApellidos.appendChild(userLastNameInput);

    divColMd4Apellidos.appendChild(divFormOutlineApellidos);

    const divColMd4Telefono = document.createElement('div');
    divColMd4Telefono.className = 'col-md-4';

    const divFormOutlineTelefono = document.createElement('div');
    divFormOutlineTelefono.className = 'form-outline';

    // Create input telefono
    const userPhoneInput = createInput({ id: 'telefono', placeholder: 'Tu teléfono', validations: telefono, labelText: 'Telefono' });
    userPhoneInput.children[1].value = telefonoUser;
    divFormOutlineTelefono.appendChild(userPhoneInput);

    divColMd4Telefono.appendChild(divFormOutlineTelefono);

    const divColMd4Correo = document.createElement('div');
    divColMd4Correo.className = 'col-md-8';

    const divFormOutlineCorreo = document.createElement('div');
    divFormOutlineCorreo.className = 'form-outline';

    // Create input correo
    const userEmailInput = createInput({ id: 'email', placeholder: 'Tu correo electrónico', validations: correo, labelText: 'Correo' });
    userEmailInput.children[1].value = correoUser;
    divFormOutlineCorreo.appendChild(userEmailInput);

    divColMd4Correo.appendChild(divFormOutlineCorreo);

    const divColMd12 = document.createElement('div');
    divColMd12.className = 'col-md-12 mt-3';

    const divFormOutlineDireccion = document.createElement('div');
    divFormOutlineDireccion.className = 'form-outline';

    // Create input direccion
    const userAddressInput = createInput({ id: 'address', placeholder: 'Tu dirección', validations: undefined, labelText: 'Dirección ( Opcional )' });
    userAddressInput.children[1].value = direccion || '';
    divFormOutlineDireccion.appendChild(userAddressInput);

    divColMd12.appendChild(divFormOutlineDireccion);

    const divPt1 = document.createElement('div');
    divPt1.className = 'pt-1 mb-4 text-center';

    // Create button
    const button = createSubmitInput({ value: 'Editar datos', divClasses: 'text-center', disabled: true });

    divPt1.appendChild(button);

    form.appendChild(divTextCenter);
    form.appendChild(divRow);
    divRow.appendChild(divColMd4Dni);
    divRow.appendChild(divColMd4Nombre);
    divRow.appendChild(divColMd4Apellidos);
    divRow.appendChild(divColMd4Telefono);
    divRow.appendChild(divColMd4Correo);
    divRow.appendChild(divColMd12);
    form.appendChild(divPt1);

    // Validate all inputs to enable button
    let inputs = Array.from(form.querySelectorAll('input[type="text"]'));
    inputs = inputs.filter((_, index) => index < 5);
    validateInputs(inputs, button.children[0]);


    cardBody.appendChild(form);
    colForm.appendChild(cardBody);

    row.appendChild(colImg);
    row.appendChild(colForm);

    card.appendChild(row);
    divCol.appendChild(card);

    section.appendChild(divCol);

    return section;
};


export default editProfileSection;


/*--------------------------------------------------------------
# Send data to server [ PHP ]
--------------------------------------------------------------*/
const sendToServer = async (e, id, especialidad_id) => {
    e.preventDefault();

    const path = window.location.pathname;

    const data = {
        dni: e.target.dni.value,
        nombre: e.target.nombre.value,
        apellido: e.target.apellido.value,
        telefono: e.target.telefono.value,
        correo: e.target.email.value,
        direccion: e.target.address.value,
    };

    try {

        if (path === URLS_APP.EDIT_PROFILE_DASHBOARD_USER) {
            const message = await updateUser(data, id);
            showAlert({ icon: 'success', title: message });
        } else if (path === URLS_APP.EDIT_PROFILE_DASHBOARD_MEDICAL) {
            const message = await updateDoctor({...data, especialidad_id }, id);
            showAlert({ icon: 'success', title: message });
        } else {
            console.log('admin', id);
            const { message } = await updateAdministrator(data, id);
            showAlert({ icon: 'success', title: message });
        }

    } catch (error) {
        console.log(error);
    }
};
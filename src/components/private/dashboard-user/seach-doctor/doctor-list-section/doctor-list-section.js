// Import CSS file
import './doctor-list-section.css';

// Import getSpecialities function
import { getSpecialties } from '../../../../../services/api/specialty';
import { getDoctor, getDoctors } from '../../../../../services/api/doctor';
import { clearContent } from '../../../../../utils/common';
import { updateModalContent } from '../../../../common';
import { modalChooseProfile } from '../../../common/services-clinic/schedule-appointment';

// Create the doctorListSection function
const doctorListSection = async (user) => {
  try {
    // Get list of specialities from API
    const specialities = await getSpecialties();

    // Get list of doctors from API
    const doctors = await getDoctors();

    // Variables para los criterios de filtrado
    let currentSpecialityId = null;
    let currentSearchTerm = '';

    // Create the section element
    const section = document.createElement('section');
    section.id = 'doctor-list';
    section.className = 'col-lg-9 col-sm-12';

    // Create the divListDoctorContainer element
    const divListDoctorContainer = document.createElement('div');
    section.appendChild(divListDoctorContainer);

    // Create the h3 element
    const h3 = document.createElement('h3');
    h3.className = 'mt-3';
    h3.textContent = 'Elige un medico';
    section.appendChild(h3);

    // Create the container element
    const container = document.createElement('div');
    container.className = 'container mb-3';

    // Create the rowContainer element
    const rowContainer = document.createElement('div');
    rowContainer.className = 'container row rowkit';

    // Create the selectContainer element
    const selectContainer = document.createElement('div');
    selectContainer.className = 'col-12 col-lg-5 col-sm-12  mb-3 mb-lg-0 me-lg-3';

    // Create the select element
    const select = document.createElement('select');
    select.className = 'form-select col';
    select.setAttribute('aria-label', 'Default select example');
    select.onchange = async (e) => {
      currentSpecialityId = e.target.value !== '0' ? e.target.value : null;
      const doctors = await doctorsFiltered(currentSpecialityId, currentSearchTerm);
      clearContent(divListDoctorContainer); // Limpia solo el contenedor de los resultados de la búsqueda
      const divListDoctorFilter = showDoctorListSection(doctors, user);
      divListDoctorContainer.appendChild(divListDoctorFilter);
    }


    // Create the option elements
    const option1 = document.createElement('option');
    option1.value = '0';
    option1.selected = true;
    option1.textContent = 'Todas las especialidades';

    // Append the option elements to the select element
    select.appendChild(option1);

    // Add the specialities to the select element
    specialities.forEach((speciality) => {
      const option = document.createElement('option');
      option.value = speciality.id;
      option.textContent = speciality.nombre;
      select.appendChild(option);
    });

    // Append the select element to the selectContainer element
    selectContainer.appendChild(select);

    // Append the selectContainer element to the rowContainer element
    rowContainer.appendChild(selectContainer);

    // Create the inputContainer element
    const inputContainer = document.createElement('div');
    inputContainer.className = 'col-12 col-lg-6 col-sm-12  mb-3 mb-lg-0 me-lg-3 buscar';

    // Create the input element
    const input = document.createElement('input');
    input.type = 'search';
    input.className = 'form-control form-control-dark';
    input.placeholder = 'Buscar';
    input.setAttribute('aria-label', 'Search');
    input.oninput = async (e) => {
      currentSearchTerm = e.target.value;
      const doctors = await doctorsFiltered(currentSpecialityId, currentSearchTerm);
      clearContent(divListDoctorContainer); // Limpia solo el contenedor de los resultados de la búsqueda
      const divListDoctorFilter = showDoctorListSection(doctors, user);
      divListDoctorContainer.appendChild(divListDoctorFilter);
    }

    // Append the input element to the inputContainer element
    inputContainer.appendChild(input);

    // Append the inputContainer element to the rowContainer element
    rowContainer.appendChild(inputContainer);

    // Append the rowContainer element to the container element
    container.appendChild(rowContainer);

    // Create the divListDoctor element
    const divListDoctor = showDoctorListSection(doctors, user);
    // Append the divListDoctor element to the divListDoctorContainer element
    divListDoctorContainer.appendChild(divListDoctor);

    // Append the container element to the section element
    section.appendChild(container);
    section.appendChild(divListDoctorContainer);

    // Return the section element
    return section;
  } catch (error) {
    console.log(error);
  }
};

const showDoctorListSection = (doctors, user) => {
  const divListDoctor = document.createElement('div');

  if (doctors.length) {
    doctors.forEach((doctor) => {
      const { id, nombre, apellido, img, specialy: { nombre: nombreSpecialty } } = doctor;
      const doctorLink = document.createElement('a');
      doctorLink.style.cursor = 'pointer';
      doctorLink.onclick = () => {
        showInfoDoctorModal(id, user);
      };

      const doctorBox = document.createElement('div');
      doctorBox.className = 'caja mt-3 p-2 d-flex';

      const doctorImage = document.createElement('img');
      doctorImage.src = img || '/assets/img/UserImages/app-logo3.png';
      doctorImage.className = 'ml-10';
      doctorImage.alt = 'Imagen doctor';
      doctorImage.width = '60';
      doctorImage.height = '60';

      const doctorContent = document.createElement('div');
      doctorContent.className = 'cont-caja m-1';

      const doctorName = document.createElement('p');
      doctorName.className = 'mb-1 mt-1';

      const doctorNameBold = document.createElement('span');
      doctorNameBold.className = 'fw-bold';
      doctorNameBold.textContent = `${nombre} ${apellido}`;

      doctorName.appendChild(doctorNameBold);

      const doctorSpecialty = document.createElement('p');
      doctorSpecialty.className = 'mb-0';
      doctorSpecialty.textContent = nombreSpecialty;

      doctorContent.appendChild(doctorName);
      doctorContent.appendChild(doctorSpecialty);

      doctorBox.appendChild(doctorImage);
      doctorBox.appendChild(doctorContent);

      doctorLink.appendChild(doctorBox);

      divListDoctor.appendChild(doctorLink);
    });
  } else {
    const doctorBox = document.createElement('div');
    doctorBox.className = 'caja mt-3 p-2 d-flex';
    doctorBox.innerHTML = `
      <div class="cont-caja m-1 d-flex justify-content-center align-items-center">
      <img src="/assets/img/UserImages/no-disponible.png" class="ml-10" alt="Imagen doctor" width="60" height="60">
        <p class="mb-1 mt-1 fw-bold ms-3">No se encontraron resultados</p>
        </div>`

    divListDoctor.appendChild(doctorBox);
  };

  return divListDoctor;

}

const doctorsFiltered = async (currentSpecialityId, currentSearchTerm) => {
  const doctors = await getDoctors(currentSpecialityId, currentSearchTerm);
  return doctors;
}

// Export the doctorListSection function as default
export default doctorListSection;

// <-- MODAL -->

// Show info doctor modal
const showInfoDoctorModal = async(idDoctor, user) => {
  try {
    const { nombre, apellido, telefono, correo, img:imgDoctor, specialy: { nombre:nombreSpecialidad, id:idSpecialty } } = await getDoctor(idDoctor);

    const modal = new bootstrap.Modal(document.getElementById('agendar-cita-modal'));

    const modalTitleContainer = document.createElement('div');
    modalTitleContainer.className = 'modal-title-container d-flex justify-content-center align-items-center';
    modalTitleContainer.innerHTML = `
    <h5 class="modal-title-text text-info text-center fw-bold" id="exampleModalCenterTitle">INFORMCION DEL MÉDICO</h5>
  `;

  const contentBody = document.createElement('div');
  contentBody.className = 'container contenedor mb-4';
  
  const link = document.createElement('a');
  link.setAttribute('data-bs-toggle', 'modal');
  
  const div1 = document.createElement('div');
  div1.className = 'd-flex justify-content-start align-items-center';
  
  const img = document.createElement('img');
  img.src = imgDoctor || '/assets/img/UserImages/app-logo3.png';
  img.alt = 'Imagen de perfil';
  img.className = 'img-fluid rounded-circle';
  img.style.width = '100px';
  img.style.height = '100px';
  img.style.border = '2px solid';
  img.style.marginRight = '10px';
  div1.appendChild(img);
  
  const div2 = document.createElement('div');
  const p1 = document.createElement('p');
  p1.className = 'm-0';
  p1.innerHTML = `<strong>Dr. ${nombre} ${apellido}</strong>`;
  div2.appendChild(p1);
  
  const p2 = document.createElement('p');
  p2.className = 'm-0 mb-4';
  p2.textContent = `Correo: ${correo}`;
  div2.appendChild(p2);
  
  const div3 = document.createElement('div');
  div3.className = 'text-center';
  const button = document.createElement('button');
  button.type = 'submit';
  button.className = 'btn btn-outline-primary btn-lg-6';
  button.textContent = 'Agendar cita';
  button.onclick = () => {
    modal.hide();

    modal._element.addEventListener('hidden.bs.modal', () => {
      modalChooseProfile({id:user.id, nombre:user.nombre, apellido:user.apellido, img:user.img, doctor: { nombre, apellido, idDoctor, idSpecialty } })
    }, { once: true });
  };
  div3.appendChild(button);
  div2.appendChild(div3);
  
  div1.appendChild(div2);
  link.appendChild(div1);
  
  const div4 = document.createElement('div');
  div4.className = 'mt-3';
  div4.innerHTML = `
      <hr>
      <Strong>Especialidad</Strong><br>
      <p class="text-black-50">${nombreSpecialidad}</p><hr>
      <Strong>Telefono:</Strong><br><p class="text-black-50"> ${telefono}</p>
  `;
  link.appendChild(div4);
  
  contentBody.appendChild(link);
  updateModalContent('agendar-cita-modal', modalTitleContainer, contentBody);
  modal.show();

  }catch (error) {
    console.log(error);
  }


};




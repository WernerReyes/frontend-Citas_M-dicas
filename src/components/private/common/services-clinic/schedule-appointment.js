import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

import { updateModalContent } from "../../../common";
import { getSpecialties } from '../../../../services/api/specialty';
import { getDoctors } from '../../../../services/api/doctor';
import { getSchedules } from '../../../../services/api/schedule';
import { showAlert, showAlertArray } from '../../../common/alerts/alerts';
import { createMedicalAppointment, updateMedicalAppointment } from '../../../../services/api/appointment';
import { createAppointmentCard } from '../../dashboard-user/home/appointmets-section/appointmets-section';

// <-- INFORMATION CITA -->
const dataCita = {
  sede: '',
  paciente_id: '',
  doctor_id: '',
  schedule_id: '',
  fecha: '',
  show_data: {
    sede: '',
    paciente: '',
    doctor: '',
    horario: '',
  }
};

let dataTemporal = null;
let idCitaEditar = null;

// Agendar cita medica
const scheduleAppointment = ({ id, nombre, apellido, img }) => {
  const container = document.createElement('div');
  container.id = 'agendar-cita';
  container.className = 'active d-flex flex-column justify-content-center align-items-center';

  const link = document.createElement('a');
  link.style.cursor = 'pointer';
  link.onclick = () => modalChooseProfile({ id, nombre, apellido, img });

  const imgCita = document.createElement('img');
  imgCita.src = '/assets/img/UserImages/app-logo1.png';
  imgCita.alt = 'Agendar cita';
  imgCita.className = 'img-fluid';
  imgCita.width = '70';

  const p = document.createElement('p');
  p.className = 'mt-2 text-white';
  p.textContent = 'Agenda una cita';

  link.appendChild(imgCita);
  link.appendChild(p);

  container.appendChild(link);

  return container;
};

export default scheduleAppointment;

// <-- MODALS -->

// Modal 1 - Elegir perfil
export const modalChooseProfile = ({ id, nombre, apellido, img, doctor = null, idCita = null }) => {
  console.log(id, nombre, apellido, img);
  const modal = new bootstrap.Modal(document.getElementById('agendar-cita-modal'));

  // Si se va a editar una cita
  if (idCita) {
    idCitaEditar = idCita;
  };

  // Recolectamos la data temporal para no perderla
  dataTemporal = doctor;


  const modalTitleContainer = document.createElement('div');
  modalTitleContainer.className = 'modal-title-container d-flex justify-content-center align-items-center';
  modalTitleContainer.innerHTML = `
    <h5 class="modal-title-text text-info text-center fw-bold" id="exampleModalCenterTitle">Elegir perfil</h5>
  `;

  const contentBody = document.createElement('div');
  contentBody.className = 'container contenedor mb-4';

  const content = document.createElement('a');
  content.href = '#';

  const div = document.createElement('div');
  div.className = 'text-center';
  div.innerHTML = `
    <div style="width: 200px; height: 200px; overflow: hidden; border: 2px solid; border-radius: 50%;">
        <img src="${img || '/assets/img/sin-perfil.jpg'}" alt="Imagen de perfil" class="imagen object-fit-fill img-fluid rounded-circle"
        style="width: 100%; height: 100%;">
    </div>
    <p>Soy yo</p>
`;

  content.appendChild(div);
  content.onclick = () => {
    modal.hide();

    // <-- INFORMATION CITA -->
    dataCita.paciente_id = id;

    dataCita.show_data.paciente = `${nombre} ${apellido}`;

    modal._element.addEventListener('hidden.bs.modal', () => {
      modalChooseHeadquarters();
    }, { once: true });
  };

  contentBody.appendChild(content);

  updateModalContent('agendar-cita-modal', modalTitleContainer, contentBody);

  modal.show();
}

// Modal 2 - Elegir sede
const modalChooseHeadquarters = () => {
  const modal = new bootstrap.Modal(document.getElementById('agendar-cita-modal'));

  const modalTitleContainer = document.createElement('div');
  modalTitleContainer.className = 'modal-title-container d-flex justify-content-center align-items-center';
  const volverLink = document.createElement('a');
  volverLink.href = '#';
  volverLink.className = 'volver';
  volverLink.innerHTML = '<strong><</strong>';
  volverLink.onclick = (event) => {
    event.preventDefault();
    modal.hide();
    modal._element.addEventListener('hidden.bs.modal', () => {
      modalChooseProfile(dataTemporal);
    }, { once: true });
  };
  const title = document.createElement('h5');
  title.className = 'modal-title-text text-info text-center fw-bold';
  title.textContent = 'Elige tu sede';
  modalTitleContainer.appendChild(volverLink);
  modalTitleContainer.appendChild(title);


  const contentBody = document.createElement('div');
  contentBody.classList.add('row');
  contentBody.innerHTML = `
    <div class="container contenedor mb-4 ">
    <a href="#" data-sede="La molina">
      <div class="sedes text-center " data-sede="La molina">
        <img data-sede="La molina" src="/assets/img/UserImages/sede1.png" alt="Imagen sede" class="mt-2 imagen img-fluid"
          width="100" height="100">
        <p data-sede="La molina">La molina</p>
      </div>
    </a>
    <a href="#" data-sede="Santa anita">
      <div class="text-center sedes" data-sede="Santa anita">
        <img data-sede="Santa anita" src="/assets/img/UserImages/sede1.png" alt="Imagen sede" class="mt-2 imagen img-fluid"
          width="100" height="100">
        <p data-sede="Santa anita">Santa Anita</p>
      </div>
    </a>
  </div>
    `;

  updateModalContent('agendar-cita-modal', modalTitleContainer, contentBody);

  modal.show();

  contentBody.onclick = e => {
    e.preventDefault();

    // Obteniendo la sede
    const sede = e.target.dataset.sede;

    // <-- INFORMATION CITA -->
    dataCita.sede = sede;

    dataCita.show_data.sede = sede;

    modal.hide();

    if (!dataTemporal) {
      modal._element.addEventListener('hidden.bs.modal', () => {
        modalChooseSpecialty();
      }, { once: true });
    } else {
      const { nombre, apellido, idDoctor, idSpecialty } = dataTemporal;

      modal._element.addEventListener('hidden.bs.modal', () => {
        dataCita.doctor_id = idDoctor;

        dataCita.show_data.doctor = `${nombre} ${apellido}`;

        modalChooseDate(idDoctor, idSpecialty);
      }, { once: true });
    }
  };

};

// Modal 3 - Elegir especialidad
const modalChooseSpecialty = async () => {
  const modal = new bootstrap.Modal(document.getElementById('agendar-cita-modal'));

  const modalTitleContainer = document.createElement('div');
  modalTitleContainer.className = 'modal-title-container d-flex justify-content-center align-items-center';
  const volverLink = document.createElement('a');
  volverLink.href = '#';
  volverLink.className = 'volver';
  volverLink.innerHTML = '<strong><</strong>';
  volverLink.onclick = (event) => {
    event.preventDefault();
    modal.hide();
    modalChooseHeadquarters();
  };
  const title = document.createElement('h5');
  title.className = 'modal-title-text text-info text-center fw-bold';
  title.textContent = 'Elige tu especialidad';
  modalTitleContainer.appendChild(volverLink);
  modalTitleContainer.appendChild(title);

  try {
    // Obtener especialidades
    const specialties = await getSpecialties();

    const contentBody = document.createElement('div');
    contentBody.className = 'd-flex justify-content-center align-items-center mb-5 p-0';

    const row = document.createElement('div');
    row.className = 'row justify-content-evenly mt-3 p-4 col-lg-3 col-md-5 col-sm-12 overflow-y-auto overflow-x-hidden';
    row.style.backgroundColor = '#ffff';
    row.style.borderRadius = '10px';
    row.style.width = '90%';
    row.style.height = '400px';

    if (specialties.length) {

      // Agregar especialidades
      specialties.forEach(({ id, img, nombre }) => {
        const div = document.createElement('div');
        div.dataset.id = id;
        div.className = 'text-center sedes';
        div.style.cursor = 'pointer';
        div.style.width = '100px';
        div.style.height = '100px';
        // div.style.borderRadius = '50%';
        div.innerHTML = `
        <img src="${img || '/assets/img/UserImages/especialidadades/oftalmologia.png'}" alt="Imagen de perfil" class="mt-2 imagen img-fluid"
          width="100" height="100" data-id="${id}">
        <p data-id="${id}">${nombre}</p>
      `;

        // Agregar evento click
        div.onclick = e => {
          const idSpecialty = e.target.dataset.id;
          modal.hide();
          modal._element.addEventListener('hidden.bs.modal', () => {
            modalChooseDoctor(idSpecialty);
          }, { once: true });
        };

        // Agregar div a la fila
        row.appendChild(div);
      });
    } else {
      row.className = 'd-flex flex-column justify-content-center align-items-center';
      row.innerHTML = `
    <img src="/assets/img/UserImages/no-disponible.png" alt="Imagen de perfil" class="mt-2 imagen img-fluid rounded-circle" style="width:230px; height:230px">
    <p>No hay especialidades disponibles</p>
  `;
    }

    // Agregar fila al contenedor
    contentBody.appendChild(row);

    // Actualizar contenido del modal
    updateModalContent('agendar-cita-modal', modalTitleContainer, contentBody);

    // Mostrar modal
    modal.show();

  } catch (error) {
    console.log(error);
  }
};

// Modal 4 - Elegir doctor
const modalChooseDoctor = async (idSpecialty) => {
  const modal = new bootstrap.Modal(document.getElementById('agendar-cita-modal'));

  const modalTitleContainer = document.createElement('div');
  modalTitleContainer.className = 'modal-title-container d-flex justify-content-center align-items-center';
  const volverLink = document.createElement('a');
  volverLink.href = '#';
  volverLink.className = 'volver';
  volverLink.innerHTML = '<strong><</strong>';
  volverLink.onclick = (event) => {
    event.preventDefault();
    modal.hide();
    modalChooseSpecialty();
  };
  const title = document.createElement('h5');
  title.className = 'modal-title-text text-info text-center fw-bold';
  title.textContent = 'Elige tu doctor';
  modalTitleContainer.appendChild(volverLink);
  modalTitleContainer.appendChild(title);

  try {

    // Obtener doctores de la especialidad [ idSpecialty ]
    const doctors = await getDoctors(idSpecialty);

    const contentBody = document.createElement('div');
    contentBody.className = 'd-flex justify-content-center align-items-center mb-5 p-0';

    const row = document.createElement('div');
    row.className = 'row justify-content-evenly col-lg-3 col-md-5 col-sm-12 mt-3 p-4 overflow-y-auto overflow-x-hidden';
    row.style.backgroundColor = '#ffff';
    row.style.borderRadius = '10px';
    row.style.width = '90%';
    row.style.height = '400px';

    // Agregar doctores
    if (doctors.length) {
      doctors.forEach(({ id, img, nombre, apellido }) => {
        const div = document.createElement('div');
        div.dataset.id = id;
        div.className = 'text-center sedes';
        div.style.cursor = 'pointer';
        div.style.width = '100px';
        div.style.height = '100px';
        div.innerHTML = `
        <img src="${img || '/assets/img/UserImages/app-logo3.png'}" alt="Imagen de perfil" class="mt-2 imagen img-fluid rounded-2 object-fit-fill w-100 h-75"
         data-id="${id}">
        <p data-id="${id}">${nombre} ${apellido}</p>
      `;
        // Agregar evento click
        div.onclick = e => {
          // Obtener id del doctor
          const idDoctor = e.target.dataset.id;
          modal.hide();

          // <-- INFORMATION CITA -->
          dataCita.doctor_id = idDoctor;

          dataCita.show_data.doctor = `${nombre} ${apellido}`;

          modal._element.addEventListener('hidden.bs.modal', () => {
            modalChooseDate(idDoctor, idSpecialty);
          }, { once: true });
        };

        // Agregar div a la fila
        row.appendChild(div);
      });
    } else {
      row.className = 'd-flex flex-column justify-content-center align-items-center';
      row.innerHTML = `
      <img src="/assets/img/UserImages/no-disponible.png" alt="Imagen de perfil" class="mt-2 imagen img-fluid rounded-circle" style="width:230px; height:230px"> 
      <p>No hay doctores disponibles para esta especialidad</p>
    `;

    }

    // Agregar fila al contenedor
    contentBody.appendChild(row);

    // Actualizar contenido del modal
    updateModalContent('agendar-cita-modal', modalTitleContainer, contentBody);

    // Mostrar modal
    modal.show();

  } catch (error) {
    console.log(error);
  }
};

// Modal 5 - Elegir fecha
const modalChooseDate = async (idDoctor, idSpecialty) => {
  const modal = new bootstrap.Modal(document.getElementById('agendar-cita-modal'));

  const modalTitleContainer = document.createElement('div');
  modalTitleContainer.className = 'modal-title-container d-flex justify-content-center align-items-center';
  const volverLink = document.createElement('a');
  volverLink.href = '#';
  volverLink.className = 'volver';
  volverLink.innerHTML = '<strong><</strong>';
  volverLink.onclick = (event) => {
    event.preventDefault();
    modal.hide();
    if (!dataTemporal)
      modalChooseDoctor(idSpecialty);
    else {
      console.log(dataTemporal);
      modal._element.addEventListener('hidden.bs.modal', () => {
        modalChooseHeadquarters()
      }, { once: true });
    }
  };
  const title = document.createElement('h5');
  title.className = 'modal-title-text text-info text-center fw-bold';
  title.textContent = 'Elige la fecha';
  modalTitleContainer.appendChild(volverLink);
  modalTitleContainer.appendChild(title);


  try {
    // Obtener horarios del doctor [ idDoctor ]
    const schedules = await getSchedules(idDoctor);

    const contentBody = document.createElement('div');
    contentBody.className = 'container contenedor mb-4';
    contentBody.style.height = '400px';
    if (schedules.length) {
      contentBody.innerHTML = `
        <div id="calendar"></div>
    `;

      // Crear el nuevo arreglo de eventos
      const events = schedules.reduce((acc, item) => {
        // Si la fecha actual no está en el acumulador, agregarla
        if (!acc.some(event => event.start === item.fecha)) {
          acc.push({
            title: 'Disponible',
            start: item.fecha
          });
        }

        return acc;
      }, []);

      modal._element.addEventListener('shown.bs.modal', () => {
        const calendarEl = document.getElementById('calendar');
        const calendar = new Calendar(calendarEl, {
          plugins: [dayGridPlugin],
          initialView: 'dayGridMonth',
          events: events,
          eventClick: function (info) {
            // Cerrar el modal actual
            modal.hide();

            // Obtener la fecha del evento en el que se hizo clic
            const clickedEventDate = info.event.startStr;

            // Abrir un nuevo modal aquí
            // Puedes usar clickedEventDate para mostrar la fecha en el nuevo modal
            modal._element.addEventListener('hidden.bs.modal', () => {
              modalChooseSchedule(idDoctor, clickedEventDate, idSpecialty);
            }, { once: true });
          }
        });
        calendar.render();
      }, { once: true });
    } else {
      contentBody.className = 'd-flex flex-column justify-content-center align-items-center';
      contentBody.innerHTML = `
    <img src="/assets/img/UserImages/no-disponible.png" alt="Imagen de perfil" class="mt-2 imagen img-fluid rounded-circle" style="width:230px; height:230px">
    <p>No hay horarios disponibles para este doctor</p>
  `;
    }


    updateModalContent('agendar-cita-modal', modalTitleContainer, contentBody);

    modal.show();

  } catch (error) {
    console.log(error);
  }

}


// Modal 6 - Elección de horario
const modalChooseSchedule = async (idDoctor, fecha, idSpecialty) => {
  const modal = new bootstrap.Modal(document.getElementById('agendar-cita-modal'));

  const modalTitleContainer = document.createElement('div');
  modalTitleContainer.className = 'modal-title-container d-flex justify-content-center align-items-center';
  const volverLink = document.createElement('a');
  volverLink.href = '#';
  volverLink.className = 'volver';
  volverLink.innerHTML = '<strong><</strong>';
  volverLink.onclick = (event) => {
    event.preventDefault();
    modal.hide();
    modalChooseDate(idDoctor, idSpecialty);
  };
  const title = document.createElement('h5');
  title.className = 'modal-title-text text-info text-center fw-bold';
  title.textContent = 'Elige tu horario';
  modalTitleContainer.appendChild(volverLink);
  modalTitleContainer.appendChild(title);

  try {

    // Obtener horarios del doctor [ idDoctor, fecha ]
    const schedules = await getSchedules(idDoctor, fecha);


    const contentBody = document.createElement('div');
    contentBody.className = 'd-flex justify-content-center align-items-center mb-5 p-0';

    if (schedules.length) {
      const row = document.createElement('div');
      row.className = 'row justify-content-evenly mt-3 p-4 overflow-y-auto overflow-x-hidden';
      row.style.backgroundColor = '#ffff';
      row.style.borderRadius = '10px';
      row.style.width = '90%';
      row.style.height = '400px';

      const contenedorCalender = document.createElement('div');
      contenedorCalender.className = 'container contenedor-calendar mb-4';

      const tarifas = document.createElement('div');
      tarifas.classList.add('text-center', 'fw-bold')
      tarifas.innerHTML = `
        <h4>Tarifas</h4>
        <div class="d-flex justify-content-evenly align-items-center p-0">
        <p style="font-size:10px">Consulta estandar de 30 minutos: S/. 50.00</p>
        <p  class="mx-2" style="font-size:10px">Consulta extendida de 45 minutos: S/. 75.00</p>
        <p style="font-size:10px">Consulta de especializada de 60 minutos: S/. 100.00</p>
        </div>
      `;

      const content = document.createElement('div');
      content.className = 'd-flex justify-content-around mb-2';

      schedules.forEach(({ id, hora_inicio, hora_fin, disponible }) => {
        const div = document.createElement('a');
        div.style.backgroundColor = '#1c4ca5';
        div.style.cursor = !disponible ? 'none' : 'pointer';
        div.dataset.id = id;
        div.className = `col-3 horarios mt-3`;
        if (!disponible) {
          div.style.pointerEvents = 'none';
          div.style.opacity = '0.6';
        }
        div.innerHTML = ` 
          <p data-id="${id}">${hora_inicio} - ${hora_fin}</p>
        `;

        // Agregar evento click
        div.onclick = e => {

          // Obtener id del horario
          const idSchedule = e.target.dataset.id;
          modal.hide();

          // <-- INFORMATION CITA -->
          dataCita.schedule_id = idSchedule;
          dataCita.fecha = fecha;

          dataCita.show_data.horario = `${hora_inicio} - ${hora_fin}`;

          modal._element.addEventListener('hidden.bs.modal', () => {
            modalConfirmAppointment(idDoctor, fecha, idSpecialty);
          }, { once: true });
        };

        // Agregar div al contenedor
        content.appendChild(div);

      });

      contenedorCalender.appendChild(tarifas);
      contenedorCalender.appendChild(content);

      row.appendChild(contenedorCalender);

      contentBody.appendChild(row);
    }

    updateModalContent('agendar-cita-modal', modalTitleContainer, contentBody);

    modal.show();

  } catch (error) {
    console.log(error);
  }
};

// Modal 7 - Confirmación de cita
const modalConfirmAppointment = (idDoctor, fecha, idSpecialty) => {
  const modal = new bootstrap.Modal(document.getElementById('agendar-cita-modal'));

  console.log(idCitaEditar);

  const modalTitleContainer = document.createElement('div');
  modalTitleContainer.className = 'modal-title-container d-flex justify-content-center align-items-center';
  const volverLink = document.createElement('a');
  volverLink.href = '#';
  volverLink.className = 'volver';
  volverLink.innerHTML = '<strong><</strong>';
  volverLink.onclick = (event) => {
    event.preventDefault();
    modal.hide();
    modalChooseSchedule(idDoctor, fecha, idSpecialty);
  };
  const title = document.createElement('h5');
  title.className = 'modal-title-text text-info text-center fw-bold';
  title.textContent = 'Confirmar cita';
  modalTitleContainer.appendChild(volverLink);
  modalTitleContainer.appendChild(title);

  const contentBody = document.createElement('div');
  contentBody.className = 'container contenedor mb-4 mt-4 p-4';
  contentBody.style.backgroundColor = '#ffff';
  contentBody.style.borderRadius = '10px';
  contentBody.style.width = '90%';
  contentBody.style.height = 'auto';

  // <-- INFORMATION CITA -->
  const { show_data: { doctor, horario, paciente, sede }, ...data } = dataCita;

  const row = document.createElement('div');
  row.className = 'row';
  row.innerHTML = ` 
    <div class="col-lg-12">
      <div>
        <h4>Doctor</h4>
        <p>${doctor}</p>
      </div>
      <div>
        <h4>Paciente</h4>
        <p>${paciente}</p>
      </div>
      <div>
        <h4>Horario</h4>
        <p>${horario}</p>
      </div>
      <div>
        <h4>Sede</h4>
        <p>${sede}</p>
      </div>
      <div>
        <p>
          <strong>Recuerda que:</strong>
          Una vez confirmada la cita, no podrá ser cancelada. Además tendras un plazo de 24 horas para pagar la cita, de lo contrario será cancelada automaticamente.
        </p>
      </div>
    </div>
  `;

  const rowButtons = document.createElement('div');
  rowButtons.className = 'd-flex justify-content-around';

  const buttonCancel = document.createElement('button');
  buttonCancel.type = 'button';
  buttonCancel.className = 'btn btn-danger';
  buttonCancel.textContent = 'Cancelar';
  buttonCancel.onclick = () => {
    modal.hide();

    // Mostramos alerta de cancelación
    showAlert({
      icon: 'success',
      title: 'Cita cancelada con éxito'
    });
  };

  const buttonConfirm = document.createElement('button');
  buttonConfirm.type = 'button';
  buttonConfirm.className = 'btn btn-primary';
  buttonConfirm.textContent = idCitaEditar ? 'Editar Cita' : 'Confirmar cita';
  buttonConfirm.onclick = async () => {
    modal.hide();

    try {
      if (idCitaEditar) {

        // Editar cita médica
        const { appointment, message } = await updateMedicalAppointment(idCitaEditar, data);

        const appointmentCard = document.querySelector(`#appointment-${idCitaEditar}`);
        const updatedAppointmentCard = createAppointmentCard(appointment);
        appointmentCard.replaceWith(updatedAppointmentCard);

        // Volver a null el id de la cita a editar
        idCitaEditar = null;

        // Mostramos alerta de confirmación
        showAlert({
          icon: 'success',
          title: message
        });
      } else {

        // Crear cita médica
        const { appointment, message } = await createMedicalAppointment(data);


        // Agregar la cita al DOM
        if (window.location.pathname.includes('home')) {
          const newAppointmentCard = createAppointmentCard(appointment);
          const appointmentsContainer = document.querySelector('#citas-medicas');
          console.log(appointmentsContainer);
          if (!appointmentsContainer.querySelector('.row')) {
            const row = document.createElement('div');
            row.className = 'row';
            row.appendChild(newAppointmentCard);
            appointmentsContainer.appendChild(row);
          } else {
            appointmentsContainer.querySelector('.row').appendChild(newAppointmentCard);
          }
        }

        // Mostramos alerta de confirmación
        showAlert({
          icon: 'success',
          title: message
        });
      }

    } catch (error) {
      if (error.status === 422) {
        showAlertArray({ icon: 'error', errors: error.data.errors })
      }
    }


  };

  rowButtons.appendChild(buttonCancel);
  rowButtons.appendChild(buttonConfirm);

  row.appendChild(rowButtons);

  contentBody.appendChild(row);


  updateModalContent('agendar-cita-modal', modalTitleContainer, contentBody);

  modal.show();

};


import Swal from "sweetalert2";

export const showAlert = ({ icon, title }) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  Toast.fire({
    icon, title
  });
};

export const showAlertArray = ({ icon, errors = [], position = "top-end" }) => {
  const errorMessages = Object.values(errors).flat();

  errorMessages.forEach(message => {
    const Toast = Swal.mixin({
      toast: true,
      position,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon, title: message
    });
  });
}

export const showConfirmAlert = ({ icon }) => {
  return new Promise((resolve) => {
    Swal.fire({
      title: "Estas seguro que deseas cancelar la cita?",
      text: "Una vez cancelada no podras revertir los cambios!",
      icon: icon,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, cancelar!"
    }).then((result) => {
      if (result.isConfirmed) {
        resolve(true);
        Swal.fire({
          title: "Cancelado con exito!",
          text: "La cita ha sido cancelada con exito.",
          icon: "success"
        });
        return;
      } 
      resolve(false);
    });
  });
}

export const showConfirmAlertComplete = ({ icon }) => {
  return new Promise((resolve) => {
    Swal.fire({
      title: "Estas seguro que deseas completar la cita?",
      text: "Una vez completada no podras revertir los cambios!",
      icon: icon,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, completar!"
    }).then((result) => {
      if (result.isConfirmed) {
        resolve(true);
        Swal.fire({
          title: "Completada con exito!",
          text: "La cita ha sido completada con exito.",
          icon: "success"
        });
        return;
      } 
      resolve(false);
    });
  });
}

export const showAlertDelete = ({ icon }) => {
  return new Promise((resolve) => {
    Swal.fire({
      title: "Estas seguro que deseas eliminar este registro?",
      text: "Una vez eliminada no podras revertir los cambios!",
      icon: icon,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        resolve(true);
        Swal.fire({
          title: "Eliminada con exito!",
          text: "El registro se ha sido eliminada con exito.",
          icon: "success"
        });
        return;
      } 
      resolve(false);
    });
  });
}
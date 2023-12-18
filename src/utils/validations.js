export const validateEmptyField = (date, message) => {
   return date.trim() === '' ? message : '';
}

export const validateNumber = (date, message) => {
   return isNaN(date) ? message : '';
}

export const validateMinLength = (date, length, message) => {
   return date.length < length ? message : '';
}

export const validateLength = (date, length, message) => {
   return date.length !== length ? message : '';
};

export const validateEmail = (email, message) => {
   const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
   return !regex.test(email) ? message : '';
}

export const validatePassword = (password, message) => {
   const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
   return !regex.test(password) ? message : '';
}

// Verify that all fields are filled out to enable the button
export const validateInputs = (inputs, button) => {
   inputs.forEach(input => {
      input.addEventListener('input', () => {
         // Check if all inputs are filled
         const allFilled = inputs.every(input => input.value.trim() !== '');
         const allValid = inputs.some(input => input.classList.contains('is-invalid'));

         if (allFilled && !allValid) {
            button.disabled = false;
         } else {
            button.disabled = true;
         }

      });
   });
}


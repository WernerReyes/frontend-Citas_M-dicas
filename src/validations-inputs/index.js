import { validateEmptyField, validateLength, validateEmail, validateNumber, validateMinLength, validatePassword } from '../utils/validations';

// <!-- ======= Validatios ======= -->
const validations = {
    nombre: [
        value => validateEmptyField(value, 'El campo nombre es requeridos'),
        value => validateMinLength(value, 5, 'El campo debe tener al menos 5 caracteres'),
    ],
    apellido: [
        value => validateEmptyField(value, 'El campo apellidos es requeridos'),
        value => validateMinLength(value, 10, 'El campo debe tener al menos 10 caracteres'),
    ],
    dni: [
        value => validateEmptyField(value, 'El campo DNI es requerido'),
        value => validateNumber(value, 'El campo DNI debe ser un número'),
        value => validateLength(value, 8, 'El campo debe tener al menos 8 caracteres'),
    ],
    telefono: [
        value => validateEmptyField(value, 'El campo telefono es requerido'),
        value => validateNumber(value, 'El campo telefono debe ser un número'),
        value => validateLength(value, 9, 'El campo debe tener al menos 9 caracteres'),
    ],
    correo: [
        value => validateEmptyField(value, 'El campo correo es requerido'),
        value => validateEmail(value, 'El correo ingresado no es valido, por favor, ingresa un correo válido'),
    ],
    password: [
        value => validateEmptyField(value, 'El campo password es requerido'),
        value => validateMinLength(value, 7, 'El campo debe tener al menos 7 caracteres'),
        value => validatePassword(value, 'El campo correo debe contener mayúsculas, minúsculas, números y caracteres especiales')

    ],
    mensaje: [
        value => validateEmptyField(value, 'El campo mensaje es requerido'),
        value => validateMinLength(value, 10, 'El campo debe tener al menos 10 caracteres'),
    ],
    cardPassword: [
        value => validateEmptyField(value, 'El La contraseña es requerido'),
        value => validateNumber(value, 'La contraseña debe ser un número'),
        value => validateMinLength(value, 4, 'El campo debe tener al menos 4 caracteres'),
    ],
    cardNumber: [
        value => validateEmptyField(value, 'El número de tarjeta es requerido'),
        value => validateNumber(value, 'El número de tarjeta debe ser un número'),
        value => validateLength(value, 16, 'El campo debe tener al menos 16 caracteres'),
    ],
};

export default validations;
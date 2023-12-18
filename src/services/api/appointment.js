import axios from 'axios';

import ENDPOINTS from '../endpoints';
import { getToken } from '../../utils/common';


export const getMedicalAppointments = async ({estado = null, estadoMedico = null, userId=null, doctorId=null}) => {
    try {
        const { data: dataAppointment } = await axios.get(
            ENDPOINTS.APPOINTMENT,
            {
                params: {
                    "estado": estado,
                    "estadoMedico": estadoMedico,
                    "userId": userId,
                    "doctorId": doctorId
                }
            }
        );
        const { appointments } = dataAppointment;
        return appointments;
    } catch (error) {
        const { data, status } = error.response;
        throw { data, status };
    }
}

export const getMedicalAppointment = async (id) => {
    try {
        const { data: dataAppointment } = await axios.get(`${ENDPOINTS.APPOINTMENT}/${id}`);
        const { appointment } = dataAppointment;
        return appointment;
    } catch (error) {
        console.log(error);
        const { data, status } = error.response;
        throw { data, status };
    }
}

export const createMedicalAppointment = async (data) => {
    try {
        const { data: dataAppointment } = await axios.post(ENDPOINTS.APPOINTMENT, data);
        const { appointment, message } = dataAppointment;
        return { appointment, message }
    } catch (error) {
        const { data, status } = error.response;
        throw { data, status };
    }
}

export const updateMedicalAppointment = async (id, data) => {
    const token = getToken('token');
    try {
        const { data: dataAppointment } = await axios.put(`${ENDPOINTS.APPOINTMENT}/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const { appointment, message } = dataAppointment;
        return { appointment, message };
    } catch (error) {     
        const { data, status } = error.response;
        throw { data, status };
    }
}

export const completeAppointment = async (id) => {
    const token = getToken('token');
    try {
        const { data: dataAppointment } = await axios.put(`${ENDPOINTS.APPOINTMENT}/complete/${id}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return dataAppointment;
    } catch (error) {     
        const { data, status } = error.response;
        throw { data, status };
    }
}

export const deleteMedicalAppointment = async (id, idHorario) => {
    const token = getToken('token');
    try {
        const { data: dataAppointment } = await axios.delete(`${ENDPOINTS.APPOINTMENT}/${id}/${idHorario}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const { message } = dataAppointment;
        return { message };
    } catch (error) {
        console.log(error);
        const { message, status } = error.response;
        throw { message, status };
    }
}
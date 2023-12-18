import axios from 'axios';

import ENDPOINTS from '../endpoints';

export const getMedicalAppointmentHistory = async (idUser=null, idDoctor=null, medicalStatus=null) => {
    try {
        const { data: { historial } } = await axios.get(ENDPOINTS.HISTORY, {
            params: {
                'user_id': idUser,
                'doctor_id': idDoctor,
                'medical_status': medicalStatus
            },
            
        });
        return historial;
    } catch (error) {
        const { data, status } = error.response;
        throw { data, status };
    }
}

export const getMedicalAppointmentHistoryById = async (idMedicalAppointment) => {
    try {
        const { data: { historial } } = await axios.get(`${ENDPOINTS.HISTORY}/${idMedicalAppointment}`);
        return historial;
    } catch (error) {
        const { data, status } = error.response;
        throw { data, status };
    }
}
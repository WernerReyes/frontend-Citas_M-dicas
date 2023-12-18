import axios from "axios";

import ENDPOINTS from "../endpoints";
import { getToken } from "../../utils/common";

export const getDoctors = async (idSpecialty = null, search = '') => {
    try {
        const { data: dataDoctors } = await axios.get(
            ENDPOINTS.DOCTOR,
            {
                params: {
                    "especialidad_id": idSpecialty,
                    "search": search
                }
            }
        );
        const { doctors } = dataDoctors;
        return doctors;
    } catch (error) {
        console.log(error);
        const { data, status } = error.response;
        throw { data, status };
    }
}

export const getDoctor = async (idDoctor) => {
    try {
        const { data: dataDoctor } = await axios.get(
            `${ENDPOINTS.DOCTOR}/${idDoctor}`
        );
        const { doctor } = dataDoctor;
        return doctor;
    } catch (error) {
        console.log(error);
        const { data, status } = error.response;
        throw { data, status };
    }
}

export const createDoctor = async (data) => {
    try {
        const { data: dataDoctor } = await axios.post(
            ENDPOINTS.DOCTOR,
            data
        );
        return dataDoctor;
    } catch (error) {
        console.log(error);
        const { data, status } = error.response;
        throw { data, status };
    }
}

export const updateDoctor = async (data, idDoctor) => {
    const token = getToken('token');
    try {
        const { data: dataDoctor } = await axios.put(
            `${ENDPOINTS.DOCTOR}/${idDoctor}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return dataDoctor;
    } catch (error) {
        console.log(error);
        const { data, status } = error.response;
        throw { data, status };
    }
}

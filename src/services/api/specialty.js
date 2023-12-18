import axios from "axios";

import ENDPOINTS from "../endpoints";
import { getToken } from "../../utils/common";

export const getSpecialties = async () => {
    try {
        const { data: dataSpecialties } = await axios.get(
            ENDPOINTS.SPECIALTY
        );
        const { specialties } = dataSpecialties;
        return specialties;
    } catch (error) {
        console.log(error);
        const { data, status } = error.response;
        throw { data, status };
    }
};

export const createSpecialty = async (specialty) => {
    try {
        const { data: dataSpecialty } = await axios.post(
            ENDPOINTS.SPECIALTY,
            specialty
        );
        return dataSpecialty;
    } catch (error) {
        const { data, status } = error.response;
        throw { data, status };
    }
}

export const updateSpecialty = async (specialty, id) => {
    const token = getToken('token');
    console.log(specialty);
    try {
        const { data: dataSpecialty } = await axios.post(
            `${ENDPOINTS.SPECIALTY}/${id}`,
            specialty, {
            headers: {
                'X-HTTP-Method-Override': 'PUT',
                Authorization: `Bearer ${token}`,
            }
        }
        );
        return dataSpecialty;
    } catch (error) {
        console.log(error);
        const { data, status } = error.response;
        throw { data, status };
    }
}

export const deleteSpecialty = async (id) => {
    const token = getToken('token');
    try {
        const { data: dataSpecialty } = await axios.delete(
            `${ENDPOINTS.SPECIALTY}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        );
        return dataSpecialty;
    } catch (error) {
        console.log(error);
        const { data, status } = error.response;
        throw { data, status };
    }
}
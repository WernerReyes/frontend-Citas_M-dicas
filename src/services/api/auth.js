import axios from 'axios';

import ENDPOINTS from '../endpoints';
import { getToken } from '../../utils/common';

export const loginUser = async (data) => {
    try {
        const { data: dataUser } = await axios.post(`${ENDPOINTS.AUTH}/login`, data);
        return dataUser;
    } catch (error) {
        const { data } = error.response;
        throw data;
    }
}

export const loginClinicStaff = async (data) => {
    try {
        const { data: dataStaff } = await axios.post(`${ENDPOINTS.AUTH}/login-personal-clinica`, data);
        return dataStaff;
    } catch (error) {
        const { data } = error.response;
        throw data;
    }
}

export const logoutPage = async () => {
    const token = getToken('token');
    try {
        const { data:dataLogout } = await axios.post(`${ENDPOINTS.AUTH}/logout`, {}, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return dataLogout;
    } catch (error) {
        const { data } = error.response;
        throw data;
    }
}

export const verifyToken = async (token) => {
    try {
        const { data } = await axios.get(`${ENDPOINTS.AUTH}/verificar-token`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return data;
    } catch (error) {
        const { data } = error.response;
        throw data;
    }
}
import axios from 'axios';

import ENDPOINTS from '../endpoints';

export const createPayment = async (data) => {
    try {
        const { data: dataPayment } = await axios.post(ENDPOINTS.PAYMENT, data);
        console.log(dataPayment);
        const { message } = dataPayment;
        return message;
    } catch (error) {
        console.log(error);
        const { message, status } = error.response;
        throw { message, status };
    }
};

export const getEarnings = async () => {
    try {
        const { data: dataEarnings } = await axios.get(`${ENDPOINTS.PAYMENT}/earnings`);
        return dataEarnings;
    } catch (error) {
        const { message, status } = error.response;
        throw { message, status };
    }
}
import axios from 'axios';

import ENDPOINTS from '../endpoints';
import { getToken } from '../../utils/common';

export const upload = async (data, folder, id, model) => {
    const token = getToken('token');
    try {
        const { data: dataUpload } = await axios.post(
            `${ENDPOINTS.UPLOAD}/${folder}/${id}/${model}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return dataUpload;
    } catch (error) {
        console.log(error);
        const { data, status } = error.response;
        throw { data, status };
    }
}

export const updateUpload = async (data, folder, id, model) => {
    const token = getToken('token');
    try {
        const { data: dataUpload } = await axios.post(
            `${ENDPOINTS.UPLOAD}/${folder}/${id}/${model}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'X-HTTP-Method-Override': 'PUT'
                },
            }
        );
        return dataUpload;
    } catch (error) {
        console.log(error);
        const { data, status } = error.response;
        console.log(data.errors, status);
        throw { data, status };
    }
}
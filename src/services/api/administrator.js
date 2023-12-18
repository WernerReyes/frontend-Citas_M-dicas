import axios from 'axios';

import ENDPOINTS from '../endpoints';
import { getToken } from '../../utils/common';

export const updateAdministrator = async (data, id) => {
    const token = getToken('token');
    try {
        const { data: dataAdministrator } = await axios.put(`${ENDPOINTS.ADMINISTRATOR}/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const { administrator, message } = dataAdministrator;
        return { administrator, message };
    } catch (error) {     
        const { data, status } = error.response;
        throw { data, status };
    }
}
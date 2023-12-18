import axios from "axios";

import ENDPOINTS from "../endpoints";
import { getToken } from "../../utils/common";

export const getUsers = async ({search=null}) => {
    try {
        const { data: dataUsers } = await axios.get(
            ENDPOINTS.USER, {
                params: {
                    "search": search
                }
            }
        );
        return dataUsers;
    } catch (error) {
        console.log(error);
        const { data, status } = error.response;
        throw { data, status };
    }
}

export const createUser = async (data) => {
    try {
        const { data: dataUser } = await axios.post(
            ENDPOINTS.USER,
            data
        );
        return dataUser;
    } catch (error) {
        console.log(error);
        const { data, status } = error.response;
        throw { data, status };
    }
};

export const updateUser = async (data, id) => {
    const token = getToken('token')
    console.log(token);
    try {
        const { data: dataUser } = await axios.put(
            `${ENDPOINTS.USER}/${id}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const { message } = dataUser;
        console.log(message, dataUser);
        return message;
    } catch (error) {
        console.log(error);
        const { data, status } = error.response;
        throw { data, status };
    }
}
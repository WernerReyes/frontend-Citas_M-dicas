import axios from "axios";

import ENDPOINTS from "../endpoints";

export const getSchedules = async (idDoctor=null, fecha=null) => {
    try {
        const { data: dataSchedule } = await axios.get(
            ENDPOINTS.SCHEDULE,
            {
                params: {
                    "doctor_id": idDoctor,
                    "fecha": fecha
                }
            }
        );
        const { schedules } = dataSchedule;
        return schedules;
    } catch (error) {
        console.log(error);
        const { data, status } = error.response;
        throw { data, status };
    }
}

export const getSchedule = async (id) => {
    try {
        const { data: dataSchedule } = await axios.get(
            `${ENDPOINTS.SCHEDULE}/${id}`
        );
        const { schedule } = dataSchedule;
        return schedule;
    } catch (error) {
        console.log(error);
        const { data, status } = error.response;
        throw { data, status };
    }
}

export const createSchedule = async (schedule) => {
    try {
        const { data: dataSchedule } = await axios.post(
            ENDPOINTS.SCHEDULE,
            schedule
        );
        return dataSchedule;
    } catch (error) {
        console.log(error);
        const { data, status } = error.response;
        throw { data, status };
    }
}

export const updateSchedule = async (schedule, id) => {
    try {
        const { data: dataSchedule } = await axios.put(
            `${ENDPOINTS.SCHEDULE}/${id}`,
            schedule
        );
        return dataSchedule;
    } catch (error) {
        console.log(error);
        const { data, status } = error.response;
        throw { data, status };
    }
}

export const deleteSchedule = async (id) => {
    try {
        const { data: dataSchedule } = await axios.delete(
            `${ENDPOINTS.SCHEDULE}/${id}`
        );
        const { message } = dataSchedule;
        return { message };
    } catch (error) {
        console.log(error);
        const { data, status } = error.response;
        throw { data, status };
    }
}
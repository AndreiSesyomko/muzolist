import {$authHost, $host} from "./index.js";
import {getCookie} from "../utils";
import {jwtDecode} from "jwt-decode";

export const registrationAPI = async (email, username, password) => {
    try {
        const {data} = await $host.post('api/register/', {email, username, password});
        return loginAPI(email, password);
    } catch (error) {
        console.log(error);
    }
};

export const loginAPI = async (email, password) => {
    try {
        const {data} = await $host.post('api/login/', {email, password});
        localStorage.setItem('token', data.access);
        localStorage.setItem('refresh', data.refresh);
        return data.user;
    } catch (error) {
        console.log(error);
    }
};

export const getUser = async (id) => {
    try {
        const {data} = await $authHost.get(`api/users/${id}/`);
        return data;
    } catch (e) {
        console.log(e);
    }
}

export const checkAuth = async () => {
    try {
        const {data} = await $host.post(`api/token/refresh/`, {refresh: localStorage.getItem('refresh')});
        localStorage.setItem('token', data.access);
        return await getUser(jwtDecode(data.access).user_id)
    } catch (e) {
        console.log(e);
    }
}
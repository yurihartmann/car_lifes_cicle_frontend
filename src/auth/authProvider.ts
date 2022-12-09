import { fetchUtils } from "react-admin";
import envs from "../envs";

export const authProvider = {
    // called when the user attempts to log in
    login: ({ username, password }) => {
        fetch(`${envs.BACKEND_URL}/user/enroll`, {
            method: 'POST',
            body: JSON.stringify({
                "id": username,
                "secret": password
            }),
        }).then(response => response.json())
            .then(data => localStorage.setItem("token", data.token))

        let func = () => {
            console.log('Yuri inteligente 5 segundos depois')
        }

        setTimeout(func, 5000)

        return Promise.resolve();
    },
    // called when the user clicks on the logout button
    logout: () => {
        localStorage.removeItem("token");
        return Promise.resolve();
    },
    // called when the API returns an error
    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem("token");
            return Promise.reject();
        }
        return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => {
        return localStorage.getItem("token")
            ? Promise.resolve()
            : Promise.reject();
    },
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => Promise.resolve(),
};

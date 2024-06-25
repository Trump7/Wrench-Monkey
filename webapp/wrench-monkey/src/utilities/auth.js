import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

export const isAuthenticated = () => {
    const token = Cookies.get('token');
    //console.log("Token is: " + token);
    if (!token) return false;

    try {
        const decoded = jwtDecode(token);
        //console.log("Decoded token is: ", decoded);
        const currentTime = Date.now() / 1000;
        return decoded.exp > currentTime;
    } catch (error) {
        console.error("Error decoding token:", error);
        return false;
    }
};

export const getUserRole = () => {
    const token = Cookies.get('token');
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        //console.log(decoded.admin);
        return decoded.admin ? 'admin' : 'user';
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
};

export const getUserId = () => {
    const token = Cookies.get('token');
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        return decoded.id;
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
};

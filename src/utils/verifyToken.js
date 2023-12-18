import { verifyToken } from "../services/api/auth";
import URLS_APP from "../urls-app";
import { getToken, redirecToPage } from "./common"

export const verifyTokenUtil = async () => {
    const token = getToken('token');

    if (!token || token.length < 10) {
        redirecToPage(URLS_APP.ACCESS_DENIED);
    }

    try {
        const { user, rol } = await verifyToken(token);

        if (!user || !rol) {
            redirecToPage(URLS_APP.ACCESS_DENIED);
        }

        return urlsProtected(user, rol);
        
    } catch (error) {
        console.log(error);
        redirecToPage(URLS_APP.ACCESS_DENIED);
    }

}

const urlsProtected = (user, rol) => {
    const path = window.location.pathname;
    if (rol === 'USER_ROLE' && path.includes('/user')) {
        return user;
    }

    if (rol === 'MEDICAL_ROLE' && path.includes('/medical')) {
        return user;
    }

    if (rol === 'ADMIN_ROLE' && path.includes('/admin')) {
        return user;
    }

    return redirecToPage(URLS_APP.ACCESS_DENIED);
} 


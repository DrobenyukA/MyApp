import {USER} from "../constants/action.constants";

export const loginAction = (user) =>{
    return {
        type: USER.LOGIN,
        payload: user
    }
};

export const logoutAction = () => {
    return {
        type: USER.LOGOUT
    }
};
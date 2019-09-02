import { LOGIN_USER, SIGN_OUT_USER } from "./authConstants";
import { CloseModal } from "../../modals/modalActions";

export const login =(creds) =>{

    return dispatch => {
        dispatch({
        type:LOGIN_USER,
        payload:{
            creds
        }
    });
    dispatch(CloseModal())
    }
}

export const logout = () =>{

    return{
        type:SIGN_OUT_USER
    }
}
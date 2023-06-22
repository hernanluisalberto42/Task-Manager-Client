import {REGISTER_SUCCESS,
    REGISTER_WRONG,
    GET_USER,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT_SESION } from "../../types";


export default (state, action)=>{
    switch(action.type){
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                cargando:false,
                autenticado: true,
                mensaje: null
            }
        case LOGOUT_SESION:
        case LOGIN_ERROR:
        case REGISTER_WRONG:
            localStorage.removeItem('token')
            return {
                ...state,
                usuario: null,
                autenticado: false,
                token: null,
                mensaje: action.payload,
                cargando:false
            }
        case GET_USER:
            return {
                ...state,
                autenticado: true,
                usuario: action.payload,
                cargando:false
            }  

        default:
            return state;
    }
}
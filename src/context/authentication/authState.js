import React,{useReducer} from 'react'
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import clientAxios from '../../config/axios';
import tokenAuth from "../../config/token";

import {REGISTER_SUCCESS,
    REGISTER_WRONG,
    GET_USER,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT_SESION } from "../../types";


const AuthState = props =>{

    const initialState={
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null, 
        mensaje: null, 
        cargando: true
    }

    const [ state, dispatch ] = useReducer(AuthReducer, initialState);

    const registerUser =async datos =>{
        try{
            const answer= await clientAxios.post('auth/register',datos);
            console.log(answer.data);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: answer.data
            });

            userAuthenticated();
         }catch(error){
            console.log(error.response.data.message)
            const alert ={
                msg: error.response.data.message,
                categoria: 'alerta-error'
            }
            dispatch({
                type:REGISTER_WRONG,
                payload: alert
            })
        }
    }

    const userAuthenticated=async()=>{
        const token=localStorage.getItem('token');
        if(token){
            tokenAuth(token);
        }
        try {
            const respuesta= await clientAxios.get("/user/token");
            console.log(respuesta.data)
            dispatch({
                type:GET_USER,
                payload: respuesta.data
            }) ;          
        } catch (error) {
            dispatch({
                type:LOGIN_ERROR
            })
        }
    }

    const loginUser = async datos =>{
         try {
            console.log(datos);
            const answer= await clientAxios.post("auth/authentication",datos);
            console.log(answer.data)
            dispatch({
                type:LOGIN_SUCCESS,
                payload: answer.data
            });

            userAuthenticated();

         } catch (error) {
            console.log(error.response.data.message)
            const alert ={
                msg: error.response.data.message,
                categoria: 'alerta-error'
            }
            dispatch({
                type:LOGIN_ERROR,
                payload: alert
            })
         }
    }

    const logoutSession=()=>{
        dispatch({
            type: LOGOUT_SESION
        })
    }

    return (
        <AuthContext.Provider
           value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                registerUser,
                userAuthenticated,
                loginUser,
                logoutSession
           }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;
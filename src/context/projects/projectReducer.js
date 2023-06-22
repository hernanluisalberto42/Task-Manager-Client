
import { FORMULARIO_PROYECTO,
    GET_PROJECTS,
    ADD_PROJECT,
    VALIDATE_FORM,
    PROJECT_ACTUAL,
    DELETE_PROJECT,
    PROJECT_ERROR
 } from '../../types/index';

export default (state, action) => {
    switch(action.type){
        case FORMULARIO_PROYECTO:
            return {
                ...state,
                formulario:true
            }
        case GET_PROJECTS:
            return {
                ...state,
                projects: action.payload
            }
        case ADD_PROJECT:
            return {
                ...state,
                projects: [...state.projects,action.payload],
                formulario:false,
                errorform: false
            }
        case VALIDATE_FORM:
            return {
                ...state,
                errorform: true
            } 
        case PROJECT_ACTUAL:
            return {
                ...state,
                project: state.projects.filter(project=>(project.idProject === action.payload))
            } 
        case DELETE_PROJECT:
            return {
                ...state,
                projects: state.projects.filter(project=>(project.idProject !== action.payload)),
                project: null
            }   
        case PROJECT_ERROR:
            return {
                ...state,
                mensaje: action.payload
            }           

        default:
            return state;
    }
}
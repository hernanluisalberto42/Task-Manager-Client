import React,{useReducer} from 'react';

import projectContext from './projectContext';
import projectReducer from './projectReducer';
import { FORMULARIO_PROYECTO,
    GET_PROJECTS,
    ADD_PROJECT,
    VALIDATE_FORM,
    PROJECT_ACTUAL,
    DELETE_PROJECT,
    PROJECT_ERROR } from '../../types/index';
import clientAxios from '../../config/axios';



const ProjectState = props =>{

/*     const proyectos = [
        {idProject: 1, name:"tienda Virtual"},
        {idProject: 2, name:"Artex" },
        {idProject: 3, name:"Intranet" },
        {idProject: 4, name:"Java"}
    ] */

    const initialState={
        /* projects : [
            {id: 1, nombre:"tienda Virtual" },
            {id: 2, nombre:"Artex" },
            {id: 3, nombre:"Intranet" }
        ], */
        projects:[],
        formulario:false,
        errorform:false,
        project: null,
        mensaje:null
    }


    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(projectReducer, initialState)

    // Serie de funciones para el CRUD
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    const getProjects = async() =>{
        try {
            const answer=await clientAxios.get("projects/");
            console.log(answer.data)
            dispatch({
                type: GET_PROJECTS,
                payload: answer.data
            })
            
        } catch (error) {
            const alert={
                msg:"There was an error",
                categoria:"alerta-error"
            }
           dispatch({
            type:PROJECT_ERROR,
            payload: alert
           })
        }
    }

    const addProject = async project =>{
        try {
            const answer=await clientAxios.post("projects",project);
            console.log(answer.data)
            dispatch({
                type: ADD_PROJECT,
                payload: answer.data
            })
        } catch (error) {
            const alert={
                msg:"There was an error",
                category:"alerta-error"
            }
           dispatch({
            type:PROJECT_ERROR,
            payload: alert
           })
        }
        

    }

    const showError =()=>{
        dispatch({
            type:VALIDATE_FORM
        })
    }

    const projectActual = projectId =>{
        dispatch({
            type: PROJECT_ACTUAL,
            payload: projectId
        })
    }

    const deleteProject = async projectId =>{
        try {
          const answer= await clientAxios.delete("projects/dell?id="+projectId);
          console.log(answer.data);
          dispatch({
            type:DELETE_PROJECT,
            payload:projectId
        })
        } catch (error) {
            const alert={
                msg:"There was an error",
                category:"alerta-error"
            }
           dispatch({
            type:PROJECT_ERROR,
            payload: alert
           })
        }
    }
    

    return (
        <projectContext.Provider
            value={{
                projects:state.projects,
                formulario: state.formulario,
                errorform: state.errorform,
                project: state.project,
                mensaje:state.mensaje,
                mostrarFormulario,
                getProjects,
                addProject,
                showError,
                projectActual,
                deleteProject
            }}
        >
            {props.children}
        </projectContext.Provider>
        
    ) 
}

export default ProjectState;
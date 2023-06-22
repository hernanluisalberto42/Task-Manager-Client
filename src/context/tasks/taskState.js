import React,{useReducer} from 'react';
import taskContext from './taskContext';
import taskReducer from './taskReducer';
import { TASK_PROJECT,
    ADD_TASK,
    VALIDATE_TASK,
    DELETED_TASK,
    STATE_TASK,
    CURRENT_TASK,
    UPDATE_TASK,
    CLEAN_TASK } from '../../types';
import clientAxios from '../../config/axios';

const TaskState = props =>{

    const initialState={
        /* tareas:[
            {id:1,nombre:"Elegir Plataforma", estado:true,projectId:1},
            {id:2,nombre:"Elegir Colores", estado:false,projectId:2},
            {id:3,nombre:"Elegir Plataformas de Pago", estado:false,projectId:3},
            {id:4,nombre:"Elegir Hosting", estado:true,projectId:4},
            {id:5,nombre:"Elegir Plataforma", estado:true,projectId:1},
            {id:6,nombre:"Elegir Colores", estado:false,projectId:2},
            {id:7,nombre:"Elegir Plataformas de Pago", estado:false,projectId:3},
            {id:8,nombre:"Elegir Hosting", estado:true,projectId:4},
            {id:9,nombre:"Elegir Plataforma", estado:true,projectId:1},
            {id:10,nombre:"Elegir Colores", estado:false,projectId:2},
            {id:11,nombre:"Elegir Plataformas de Pago", estado:false,projectId:3},
            {id:12,nombre:"Elegir Hosting", estado:true,projectId:4},
            {id:13,nombre:"Elegir Plataforma", estado:true,projectId:3}
        ], */
        taskProject: [],
        errorTask: false,
        taskSelected: null
    }

    const [state,dispatch]= useReducer(taskReducer,initialState);

    const getTaskByProject= async projectId=>{
        try {
            const result=await clientAxios.get(`tasks/tasks/${projectId}/project`)
            dispatch({
                type: TASK_PROJECT,
                payload: result.data
            });
        } catch (error) {
            console.log(error)
        }
    }

    const addTask = async task=>{
        try {
            const answer=await clientAxios.post("tasks",task);
            console.log(answer.data)
            dispatch({
                type: ADD_TASK,
                payload: task
            })
        } catch (error) {
            console.log(error);
        }
    }

    const validateTask=()=>{
        dispatch({
            type: VALIDATE_TASK
        })
    }

    const deleteTask= async idTask=>{
        try {
            await clientAxios.delete("tasks/dell?id="+idTask)
            dispatch({
                type: DELETED_TASK,
                payload: idTask
            });
        } catch (error) {
            console.log(error);
        }
    }

    const stateTask=(task)=>{
         dispatch({
            type:STATE_TASK,
            payload: task
         })
    }

    const saveTaskCurrent=task=>{
        dispatch({
            type:CURRENT_TASK,
            payload: task
        })
    }

    const updateTask=async task=>{
        try {
            const result= await clientAxios.put(`tasks/edit/${task.idTask}`, task)
            dispatch({
                type:UPDATE_TASK,
                payload: result.data
            });
        } catch (error) {
            console.log(error)
        }
    }

    const cleanTask=()=>{
        dispatch({
            type:CLEAN_TASK
        })
    }

    return (
        <taskContext.Provider
             value={{
                //tareas:state.tareas,
                taskProject:state.taskProject,
                errorTask: state.errorTask,
                taskSelected: state.taskSelected,
                getTaskByProject,
                addTask,
                validateTask,
                deleteTask,
                //stateTask,
                saveTaskCurrent,
                updateTask,
                cleanTask
             }}
        >
            {props.children}
        </taskContext.Provider>
    )
}

export default TaskState;



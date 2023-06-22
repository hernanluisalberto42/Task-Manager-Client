import React,{useContext} from 'react'
import taskContext from '../../context/tasks/taskContext';
import projectContext from '../../context/projects/projectContext';

const Task = ({task}) => {

    const tasksContext= useContext(taskContext);

    const{deleteTask,getTaskByProject,updateTask,/*stateTask,*/saveTaskCurrent}=tasksContext;

    const projectsContext=useContext(projectContext);

    const{project}=projectsContext;

    const[projectActual]=project;

    const taskDelete=id=>{
        deleteTask(id);
        getTaskByProject(projectActual.idProject)
    }

    const changeState=task=>{
        if(task.state){
            task.state=false;
        }else{
            task.state=true
        }
        updateTask(task);
    }

    const selectTaskToUpdate=task=>{
        saveTaskCurrent(task)
    }

    return (
        <li className="tarea sombra">
            <p>{task.name}</p>

            <div className="estado">
                {task.state 
                ?  
                    (
                        <button
                            type="button"
                            className="completo"
                            onClick={()=>changeState(task)}
                        >Completo</button>
                    )
                : 
                    (
                        <button
                            type="button"
                            className="incompleto"
                            onClick={()=>changeState(task)}
                        >Incompleto</button>
                    )
                }
            </div>

            <div className="acciones">
                <button 
                    type="button"
                    className="btn btn-primario"
                    onClick={()=>selectTaskToUpdate(task)}
                >Editar</button>

                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={()=>taskDelete(task.idTask)}
                >Eliminar</button>
            </div>
        </li>
    );
}

export default Task;
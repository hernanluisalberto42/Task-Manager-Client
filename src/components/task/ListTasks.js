import React,{Fragment,useContext} from 'react'
import Task from './Task';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';
import { CSSTransition,TransitionGroup } from 'react-transition-group';


const ListTasks = () => {

    const projectsContext=useContext(projectContext);

    const{project,deleteProject}=projectsContext;

    const tasksContext= useContext(taskContext);

    const{taskProject}=tasksContext;

    if(!project) return <h2>Select a Project</h2>

    const [projectActual]=project;


    return (
        <Fragment>
            <h2>Proyecto: {projectActual.name}</h2>

            <ul className="listado-tareas">

                {taskProject.length ===0
                   ? (<li className="tarea"><p>No hay tareas</p></li>) 
                   : <TransitionGroup>
                        { taskProject.map(task=>(
                            <CSSTransition
                               key={task.idTask}
                               timeout={200}
                               classNames="tarea"
                            >
                                <Task
                                    key={task.idTask}
                                    task={task}
                                />
                            </CSSTransition>
                        ))}
                   </TransitionGroup>
                }
                
            </ul>

            <button     
                type="button"
                className="btn btn-eliminar"
                onClick={()=>deleteProject(projectActual.idProject)}
            >Eliminar Proyecto &times;</button>
        </Fragment>
    );
}

export default ListTasks;
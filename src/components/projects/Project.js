import React,{useContext} from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const Project = ({project}) => {
    
    const projectsContext=useContext(projectContext);

    const{projectActual}=projectsContext;

    const tasksContext= useContext(taskContext);

    const{getTaskByProject}=tasksContext;

    const selectProject=idProject=>{
        projectActual(idProject)
        getTaskByProject(idProject) 
    }

    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={()=>selectProject(project.idProject)}
            >{project.name} </button>
        </li>
    );
}

export default Project;
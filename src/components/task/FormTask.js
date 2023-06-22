import React,{useState,useContext,useEffect} from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const FormTask = () => {

    const projectsContext=useContext(projectContext);

    const{project}=projectsContext;

    const tasksContext=useContext(taskContext);

    const{taskSelected,errorTask,addTask,validateTask,getTaskByProject,updateTask,cleanTask}=tasksContext;

    useEffect(() => {
      if(taskSelected !==  null){
        setTask(taskSelected)
      }else{
        setTask({
            name:'',
            state:'',
            projectId:''
        })
      }
    }, [taskSelected])
    


    const[task,setTask]= useState({
        name:'',
        state:'',
        projectId:''
    })

    const{name}=task;

    if(!project) return null;

    const [projectActual]=project;

    const updateState=e=>{
        setTask({
            ...task,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit=e=>{
        e.preventDefault();
        
        if(name.trim() === ''){
           validateTask()
           return;
        }
        if(taskSelected === null){
            task.projectId=projectActual.idProject
            task.state=false
            addTask(task)
        }else{
            updateTask(task);
            cleanTask();
        }

        getTaskByProject(projectActual.id)

        setTask({
            name:'',
            state:'',
            projectId:''
        })
    }

    return (
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="name"
                        value={name}
                        onChange={updateState}
                    />
                </div>

                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={taskSelected ? "Editar" : "Agregar"}
                    />
                </div>
            </form>

            {errorTask ? <p className='mensaje error'>Name's Task is required!..</p>: null}

    </div>
    );
}

export default FormTask;
import React, { Fragment,useState,useContext,useEffect } from 'react'
import projectContext from '../../context/projects/projectContext';
import authContext from '../../context/authentication/authContext';

const NewProject = () => {

    const projectsContext=useContext(projectContext)

    const{formulario,errorform,mostrarFormulario,addProject,showError}=projectsContext;

    const AuthContext=useContext(authContext);

    const {usuario}=AuthContext;

    
    const [project, setProject] = useState({
        name:''
    })
    

    const{name}=project

    const updateState=e=>{
        setProject({
            ...project,
            [e.target.name]:e.target.value
        })
    }

    const submitProject=e=>{
        e.preventDefault();
        if(name.trim() === ''){
            showError();
            return;
        }

        project.userId=usuario.idUser;

        addProject(project)
        
        setProject({
            name:''
        })
    }
    

    return (
        <Fragment>
            <button 
                type="button"
                className="btn btn-block btn-primario"
                onClick={()=>mostrarFormulario()}
            >Nuevo Proyecto</button>
        
            { formulario 
                  ? (
                    <form
                        className="formulario-nuevo-proyecto"
                        onSubmit={submitProject}
                    >
                        <input 
                            type="text"
                            className="input-text"
                            placeholder="Nombre Proyecto"
                            name="name"
                            value={name}
                            onChange={updateState}
                        />

                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Agregar Proyecto"
                        />
                        
                    </form>
                  ) : null }
                  {errorform ? <p className="mensaje error">El nombre del Proyecto es obligatorio</p> : null}
        </Fragment>
    );
}

export default NewProject;
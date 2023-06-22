import React,{useContext,useEffect} from 'react'
import Project from './Project';
import projectContext from '../../context/projects/projectContext';
import { TransitionGroup,CSSTransition } from 'react-transition-group';
import AlertContext from '../../context/alerts/alertContext';

const ListProjects = () => {

    const projectsContext=useContext(projectContext);

    const{mensaje,projects,getProjects}=projectsContext;

    const alertContext=useContext(AlertContext);

    const {alert,showAlert}=alertContext;
    
    useEffect(() => {

        if(mensaje){
            showAlert(mensaje.msg,mensaje.category)
        }

        getProjects();
        //eslint-disable-next-line
    }, [mensaje])

    
    if(projects.length === 0) return <p>There is not projects, start creating one...</p>;

    return (
        <ul className="listado-proyectos">
            { alert   ? ( <div className={`alerta ${alert.categoria} `}>{alert.msg}</div>  ) : null  }
           <TransitionGroup>
                {projects.map(project=>(
                        <CSSTransition
                            key={project.idProject}
                            timeout={200}
                            classNames="proyecto"
                        >
                            <Project
                                project={project}
                            />
                        </CSSTransition>
                ))}  
            </TransitionGroup>  
        </ul>
    );
}

export default ListProjects;
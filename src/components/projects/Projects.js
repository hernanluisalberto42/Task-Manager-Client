import React,{useContext,useEffect} from 'react'
import NavBar from '../layout/NavBar';
import Sidebar from '../layout/Sidebar';
import FormTask from '../task/FormTask';
import ListTasks from '../task/ListTasks';
import AuthContext from '../../context/authentication/authContext';

const Projects = () => {

    const authContext = useContext(AuthContext);
    const { usuario,userAuthenticated } = authContext;  
    
    useEffect(() => {
        userAuthenticated();
        // eslint-disable-next-line
    }, [])


    return (
        <div className="contenedor-app">
            
            <Sidebar />

            <div className="seccion-principal">

                <NavBar/>
                <main>
                    <FormTask/>
                    <div className="contenedor-tareas">
                         <ListTasks/>
                    </div>

                </main>
            </div>

        </div>
    );
}

export default Projects;
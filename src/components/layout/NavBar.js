import React,{useContext,useEffect} from 'react'
import AuthContext from '../../context/authentication/authContext';

const NavBar = () => {


    const authContext = useContext(AuthContext);
    const { usuario,userAuthenticated,logoutSession } = authContext;  
    
    useEffect(() => {
        userAuthenticated();
        // eslint-disable-next-line
    }, [])

    return (
        <header className="app-header">
            { usuario ? <p className='nombre-usuario'>Hola <span>{usuario.name}</span></p> : null}                 
            <nav className="nav-principal">
                <button 
                    className="btn btn-blank cerrar-sesion" 
                    onClick={()=>logoutSession()}
                >Cerrar Sesión</button>
            </nav>
        </header>
    );
}

export default NavBar;
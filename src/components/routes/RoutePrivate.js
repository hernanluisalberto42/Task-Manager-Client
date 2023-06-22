import React,{useContext,useEffect} from 'react';
import { Navigate} from 'react-router-dom';
import AuthContext from '../../context/authentication/authContext';

const RoutePrivate=({children})=>{


    const authContext= useContext(AuthContext);
    const {autenticado,cargando,userAuthenticated}=authContext;

    useEffect(() => {
      userAuthenticated();
    }, []);
    
     
    if(autenticado !== true && !cargando){
        return <Navigate to="/" replace />;
    }
    return children;

   
}

export default RoutePrivate;
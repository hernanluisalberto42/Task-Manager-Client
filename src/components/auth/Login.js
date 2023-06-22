import React,{useState,useContext,useEffect} from 'react'
import {Link,useNavigate} from 'react-router-dom';
import alertContext from '../../context/alerts/alertContext';
import authContext from '../../context/authentication/authContext';

const Login = () => {

    const AlertContext=useContext(alertContext);

    const {alert,showAlert}=AlertContext;

    const AuthContext=useContext(authContext);

    const {mensaje,autenticado,loginUser}=AuthContext;

    const navigate=useNavigate();

    useEffect(() => {
        if(autenticado){
            navigate('/projects');
        }
        if(mensaje){
          showAlert(mensaje.msg, mensaje.categoria);
        }
      }, [mensaje, autenticado,navigate])
    
    
    const [user, setUser] = useState({
        email:'',
        password:''
    })

    const{email,password}=user;

    const updateState=(e)=>{
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }

    const submit=e=>{
        e.preventDefault();

        if(email.trim() === '' || password.trim() === ''){
            showAlert('Todos los campos son obligatorios', 'alerta-error');
            return;
        }
        
        loginUser({email,password})


    }
    

    return (
        <div className='form-usuario'>
            { alert ? ( <div className={`alerta ${alert.categoria}`}> {alert.msg} </div> )  : null }
            <div className='contenedor-form sombra-dark'>
                  <h1>Iniciar Session</h1>
                  <form
                    onSubmit={submit}
                  >
                        <div className="campo-form">
                                <label htmlFor="email">Email</label>
                                <input 
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Tu Email"
                                    value={email}
                                    onChange={updateState}
                                />
                        </div>
                        <div className="campo-form">
                                <label htmlFor="password">Password</label>
                                <input 
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Tu Password"
                                    value={password}
                                    onChange={updateState}
                                />
                        </div>
                        <div className="campo-form">
                            <input 
                                 type="submit" 
                                 className="btn btn-primario btn-block"
                                  value="Iniciar Sesión" 
                            />
                        </div>
                  </form> 
                  <Link to="/new-account" className="enlace-cuenta">
                     Get Account
                  </Link>  
            </div>  
                     
        </div>
    );
}

export default Login;
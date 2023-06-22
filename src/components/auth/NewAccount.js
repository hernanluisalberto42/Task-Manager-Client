import React,{useState,useContext, useEffect} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import alertContext from '../../context/alerts/alertContext';
import authContext from '../../context/authentication/authContext';

const NewAccount = (props) => {

    const AlertContext=useContext(alertContext);

    const {alert,showAlert}=AlertContext;

    const AuthContext=useContext(authContext);

    const {mensaje,autenticado,registerUser}=AuthContext;

    const navigate=useNavigate();

    useEffect(() => {
      if(autenticado){
        navigate('/projects');
      }

      if(mensaje){
        showAlert(mensaje.msg, mensaje.categoria);
      }
    }, [mensaje, autenticado, navigate])
    

    const [user, setUser] = useState({
        name:'',
        email:'',
        password:'',
        confirmar:''
    })

    const{name,email,password,confirmar}=user;

    const updateState=(e)=>{
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }

    const submit=e=>{
        e.preventDefault();

        if( name.trim() === '' || 
            email.trim() === '' || 
            password.trim() === '' || 
            confirmar.trim() === '' ) {
                showAlert('Todos los campos son obligatorios', 'alerta-error');
                return;
            }

        // Password minimo de 6 caracteres
        if(password.length < 6) {
            showAlert('El password debe ser de al menos 6 caracteres', 'alerta-error');
            return;
        }

        // Los 2 passwords son iguales
        if(password !== confirmar) {
            showAlert('Los passwords no son iguales', 'alerta-error');
            return;
        }

        registerUser({
            name,
            email,
            password
        })

    }
    

    return (
        <div className='form-usuario'>
            { alert ? ( <div className={`alerta ${alert.categoria}`}> {alert.msg} </div> )  : null }
            <div className='contenedor-form sombra-dark'>
                  <h1>Get Account</h1>
                  <form
                    onSubmit={submit}
                  >
                        <div className="campo-form">
                            <label htmlFor="name">name</label>
                            <input 
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Tu name"
                                value={name}
                                onChange={updateState}
                            />
                        </div>

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
                            <label htmlFor="confirmar">Confirmar Password</label>
                            <input 
                                type="password"
                                id="confirmar"
                                name="confirmar"
                                placeholder="Repite tu Password"
                                value={confirmar}
                                onChange={updateState}
                            />
                        </div>

                        <div className="campo-form">
                            <input 
                                 type="submit" 
                                 className="btn btn-primario btn-block"
                                  value="Registar" 
                            />
                        </div>
                  </form> 
                  <Link to="/" className="enlace-cuenta">
                     Login
                  </Link>  
            </div>  
                     
        </div>
    );
}

export default NewAccount;
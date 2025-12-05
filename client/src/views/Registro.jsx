import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from '../css/Registro.module.css'

const Registro = ({setLogin}) => {

    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirmation: '',
    })
    const [errors, setErrors] = useState({})
    const navigate = useNavigate();

    const updateState = (e) => {
        setState({...state, [e.target.name] : e.target.value})
    }

    const regresar = () => {
        navigate('/')
    }

    const registrar = (e) => {
        e.preventDefault();
        const URL = 'http://localhost:8080/api/users/register';
        axios.post(URL, state).then(
            response => {
                localStorage.setItem('token', response.data.token)
                setLogin(true)
                setErrors({})
                navigate('/')
            }
            
        ).catch(
            e => setErrors(e.response.data.errors)
        )
    }

    return(
        <div className={styles.registro}>
            <button onClick={regresar} >Regresar</button>
            <form onSubmit={e => registrar(e)} >
                <h1>Registrarse</h1>
                <div className={styles.nombres}>
                    <div>
                        <label htmlFor="firstName">Nombre: </label>
                        <br />
                        <input type="text" name="firstName" id="firstName" value={state.firstName} onChange={(e)=>updateState(e)} />
                        {errors.firstName && <p style={{color: "red"}}>{errors.firstName}</p>}
                    </div>
                    <div>
                        <label htmlFor="lastName">Apellido: </label>
                        <br />
                        <input type="text" name="lastName" id="lastName" value={state.lastName} onChange={(e)=>updateState(e)} />
                        {errors.lastName && <p style={{color: "red"}}>{errors.lastName}</p>}
                    </div>
                </div>
                <div className={styles.cuenta}>
                    <label htmlFor="email">Email: </label>
                    <br />
                    <input type="email" name="email" id="email" value={state.email} onChange={(e)=>updateState(e)} />
                    {errors.email && <p style={{color: "red"}}>{errors.email}</p>}
                    <br />
                    <label htmlFor="password">Contraseña: </label>
                    <br />
                    <input type="password" name="password" id="password" value={state.password} onChange={(e)=>updateState(e)} />
                    {errors.password && <p style={{color: "red"}}>{errors.password}</p>}
                    <br />
                    <label htmlFor="passwordConfirmation">Confirma tu contraseña: </label>
                    <br />
                    <input type="password" name="passwordConfirmation" id="passwordConfirmation" value={state.passwordConfirmation} onChange={(e)=>updateState(e)} />
                    {errors.passwordConfirmation && <p style={{color: "red"}}>{errors.passwordConfirmation}</p>}
                </div>
                <button>Crear cuenta</button>
                <div className={styles.iniciar}>
                    <p>¿Ya tienes una cuenta?</p>
                    <a href="/">Iniciar Sesión</a>
                </div>
            </form>
            <div>
                <p>Únete a la familia de Easy Flights.</p>
                <p>Volar nunca fue tan sencillo.</p>
            </div>
        </div>
    )
}

export default Registro;
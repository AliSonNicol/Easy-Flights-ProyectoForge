import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from '../css/Login.module.css'

const Login = ({setLogin}) => {

    const [state, setState] = useState({
        email : '',
        password : '',
    })
    const [errors, setErrors] = useState({})
    const navigate = useNavigate();

    const updateState = (e) => {
        setState({...state, [e.target.name] : e.target.value})
    }

    const loginProcess = (e) => {
        e.preventDefault();
        const URL = 'http://localhost:8080/api/users/login'
        axios.post(URL, state).then(
            response => {
                const token = response.data.token;
                localStorage.setItem('token', token)
                setLogin(true)
                setErrors({})
                navigate('/busqueda')
            }
        ).catch(e => {
            const errores = e.response?.data?.errors;
            setErrors(errores || { general: 'Error de conexión o credenciales incorrectas'});
        })
    }

    return(
        <div className={styles.login}>
            <button>Regresar</button>
            <div>
                <p>Accede y viaja sin complicaciones.</p>
                <p>Tu próxima aventura empieza aquí.</p>
            </div>
            <form onSubmit={e => loginProcess(e)} >
                <h1>Iniciar Sesión</h1>
                <div>
                    <label htmlFor="email">Email: </label>
                    <br />
                    <input type="email" name="email" id="email" value={state.email} onChange={(e)=>updateState(e)}/>
                    {errors.email && <p style={{color: "red"}}>{errors.email}</p>}
                </div>
                <div>
                    <label htmlFor="contra">Contraseña: </label>
                    <br />
                    <input type="password" name="password" id="password" value={state.password} onChange={(e)=>updateState(e)} />
                    {errors.password && <p style={{color: "red"}}>{errors.password}</p>}
                </div>
                <button>Ingresar</button>
                <div className={styles.registrate}>
                    <p>¿Aún no tienes una cuenta?</p>
                    <a href="/registro">Regístrate</a>
                </div>
            </form>
        </div>
    )
}

export default Login;
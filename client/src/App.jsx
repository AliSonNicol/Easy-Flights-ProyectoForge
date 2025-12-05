import './App.css'
import {Routes, Route, Link, NavLink, useNavigate} from 'react-router-dom'
import Login from './views/Login.jsx'
import Registro from './views/Registro.jsx'
import { useState } from 'react'
import Busqueda from './views/Busqueda.jsx'


function App() {

  const [login, setLogin] = useState(false)
  const navigate = useNavigate()

  const logOut = () => {
    localStorage.removeItem('token')
    setLogin(false)
    navigate('/')
  }


  return (
    <>
      <Routes>
        <Route path='/' element={<Login setLogin={setLogin} ></Login>} />
        <Route path='/login' element={<Login setLogin={setLogin} ></Login>} />
        <Route path='/registro' element={<Registro setLogin={setLogin} ></Registro>} />
        <Route path='/busqueda' element={ <Busqueda logOut={logOut} ></Busqueda>} />
      </Routes>
    </>
  )
}

export default App

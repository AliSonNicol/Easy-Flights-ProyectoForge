import {Router} from "express"
import userController from "../controllers/users.controller.js"


const usersRoutes = Router();

//LISTA DE TODOS LOS USUARIOS
usersRoutes.get('/', userController.getAll)

//CREAR NUEVO USUARIO
usersRoutes.post('/register', userController.createOne)

//INICIO DE SESION
usersRoutes.post('/login',userController.login )

// BORRAR USUARIO
usersRoutes.delete('/delete', userController.deleteOne);



export default usersRoutes;
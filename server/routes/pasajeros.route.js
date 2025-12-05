import {Router} from "express"
import validateToken from "../middleware/validateToken.js";
import pasajerosController from "../controllers/pasajeros.controller.js";

const pasajerosRoutes = Router();

pasajerosRoutes.get('/', validateToken , pasajerosController.getAll )
pasajerosRoutes.post('/new', validateToken, pasajerosController.createOne)
pasajerosRoutes.get('/:id', validateToken, pasajerosController.getOne)
pasajerosRoutes.delete('/destroy/:id', validateToken, pasajerosController.deleteOne)
pasajerosRoutes.put('/update/:id',validateToken,  pasajerosController.updateOne)

export default pasajerosRoutes;
import { Router } from "express";
import { buscarVuelos } from "../controllers/flights.controller.js";

const router = Router();

router.get("/search", buscarVuelos);

export default router;

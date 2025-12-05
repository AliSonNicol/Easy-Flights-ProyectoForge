import { Router } from 'express';
import amadeusController from '../controllers/amadeus.controller.js';

const amadeusRoutes = Router();

amadeusRoutes.get('/flight-offers', amadeusController.buscarVuelos);

amadeusRoutes.get('/flight-destinations', amadeusController.destinosBaratos);

amadeusRoutes.get('/airport-search', amadeusController.buscarAeropuertos);

export default amadeusRoutes;
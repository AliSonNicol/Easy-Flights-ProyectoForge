import amadeus from '../config/amadeus.js';

const amadeusController = {
    // BUSQUEDA DE VUELOS:
    buscarVuelos : async (req, res) => {
        try {
            const {
                origen,
                destino,
                fechaIda,
                fechaVuelta,       // opcional (ida y vuelta)
                adultos = 1,
                clase = 'ECONOMY',      // ECONOMY, PREMIUM_ECONOMY, BUSINESS, FIRST
                directo = false,
                moneda = 'USD',
                maxPrecio,
                lista = 10,
            } = req.query;
    
            const response = await amadeus.shopping.flightOffersSearch.get({
                originLocationCode: origen,
                destinationLocationCode: destino,
                departureDate: fechaIda,
                returnDate: fechaVuelta || undefined,
                adults: Number(adultos),
                travelClass: clase,
                nonStop: directo === 'true',
                currencyCode: moneda,
                maxPrice: maxPrecio ? Number(maxPrecio) : undefined,
                max: Number(lista),
            });
    
            res.json(response.data);
    
        } catch (error) {
            console.error('Error Amadeus Flight Offers:', error);
    
            // Error controlado de Amadeus (400, 404, etc.):
            if (error.response) {
                return res.status(error.response.status || 400).json({
                    error: 'Error de Amadeus',
                    mensaje: error.description || error.response.data?.errors?.[0]?.detail || 'Error en la búsqueda de vuelos',
                    detalles: error.response.data
                });
            }
    
            // Error de red, timeout, etc.:
            if (error.request) {
                return res.status(503).json({
                    error: 'Servicio no disponible',
                    mensaje: 'No se pudo conectar con Amadeus'
                });
            }
    
            // Error inesperado del SDK o código:
            return res.status(500).json({
                error: 'Error interno del servidor',
                mensaje: error.message
            });
        }
    },
    
    // DESTINOS BARATOS DESDE CIUDAD:
    destinosBaratos : async (req, res) => {
        try {
            const { origen, maxPrecio, fechaIda, directo = true } = req.query;
    
            const response = await amadeus.shopping.flightDestinations.get({
                originLocationCode: origen,
                maxPrice: maxPrecio ? Number(maxPrecio) : undefined,
                departureDate: fechaIda,
                oneWay: directo === 'true',
            });
    
            res.json(response.data);
    
        } catch (error) {
            console.error('Error Amadeus:', error);
    
            if (error.response) {
                return res.status(error.response.status || 400).json({
                    error: error.description || 'Error de Amadeus',
                    detalles: error.response.data
                });
            }
    
            return res.status(500).json({
                error: 'Error interno del servidor',
                mensaje: error.message
            });
        }
    },
    
    // INFORMACIÓN DE AEROPUERTO O CIUDAD:
    buscarAeropuertos : async (req, res) => {
        try {
            const { palabraBusqueda, codigoCiudad } = req.query;
    
            const response = await amadeus.referenceData.locations.get({
                keyword: palabraBusqueda,
                subType: 'AIRPORT,CITY',
                countryCode: codigoCiudad || undefined,
            });
    
            res.json(response.data);
    
        } catch (error) {
            console.error('Error Amadeus:', error);
    
            if (error.response) {
                return res.status(error.response.status || 400).json({
                    error: error.description || 'Error de Amadeus',
                    detalles: error.response.data
                });
            }
    
            return res.status(500).json({
                error: 'Error interno del servidor',
                mensaje: error.message
            });
        }
    }
}

export default amadeusController;
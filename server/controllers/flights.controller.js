import amadeus from "../services/amadeusClient.js";

export const buscarVuelos = async (req, res) => {
  try {
    const { from, to, date, returnDate, adults } = req.query;

    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: from,
      destinationLocationCode: to,
      departureDate: date,
      returnDate: returnDate || undefined,
      adults: adults,
      currencyCode: "USD",
    });

    res.json(response.data);

  } catch (error) {
    console.error("Error con Amadeus:", error);
    res.status(500).json({ error: "Error buscando vuelos" });
  }
};

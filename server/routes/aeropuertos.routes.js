import express from "express";
import { airports } from "../data/aeropuertos.js";

const airportsRoute = express.Router();

// /api/airports/search?q=peru
airportsRoute.get("/search", (req, res) => {
  const query = req.query.q?.toLowerCase() || "";

  const results = airports.filter((a) =>
    a.city.toLowerCase().includes(query) ||
    a.country.toLowerCase().includes(query) ||
    a.code.toLowerCase().includes(query)
  );

  res.json(results);
});

export default airportsRoute;

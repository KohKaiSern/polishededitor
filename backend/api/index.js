import express from "express";
import cors from "cors";
import getVersions from "./version.js";
import getAddresses from "./addresses.js";
import getPokemon from "./pokemon.js";
import getAbilities from "./abilities.js";
import getMoves from "./moves.js";
import getItems from "./items.js";
const app = express();

//Middleware
app.use(cors());

//Home/Versions Route
app.get("/", (req, res) => res.json(getVersions()));

//Address Route
app.get("/addresses", (req, res) => res.json(getAddresses()));

//Pokemon Route
app.get("/pokemon", (req, res) => res.json(getPokemon()));

//Abilities Route
app.get("/abilities", (req, res) => res.json(getAbilities()));

//Moves Route
app.get("/moves", (req, res) => res.json(getMoves()));

//Items Route
app.get("/items", (req, res) => res.json(getItems()));

app.listen(3000, () => console.log("Server ready on port 3000."));

export default app;

import express from "express";
import cors from "cors";
import getAbilities from "./abilities.js";
const app = express();

//Middleware
app.use(cors());

//Home Route
app.get("/", (req, res) => res.send("Polished Editor Backend Functional!"));

//Abilities Route
app.get("/abilities", (req, res) => res.json(getAbilities()));

app.listen(3000, () => console.log("Server ready on port 3000."));

export default app;

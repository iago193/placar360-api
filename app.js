import { configDotenv } from "dotenv";
configDotenv();

import express from "express";

import homeRoute from "./src/routes/homeRoute.js";
import leaguesRoute from "./src/routes/leaguesRoute.js";
import matchesRoute from "./src/routes/matchesRoute.js";
import playersRoute from "./src/routes/playersRoute.js";

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json()); // habilita JSON no body
  }

  routes() {
    this.app.use("/", homeRoute); // rota inicial
    this.app.use("/leagues", leaguesRoute); // ligas
    this.app.use("/matches", matchesRoute); // partidas
    this.app.use("/players", playersRoute); // jogadores
  }
}

export default new App().app;

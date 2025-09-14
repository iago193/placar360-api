import { Router } from "express";
import leaguesController from "../controllers/leaguesController.js";

const router = Router();

router.get("/", leaguesController.index);
router.get("/standings/:id/:season", leaguesController.standings);

export default router;
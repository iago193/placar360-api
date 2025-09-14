import { Router } from "express";
import playersController from '../controllers/playersController.js';

const router = Router();

router.get('/topScorers', playersController.topScorers);
router.get('/topAssists', playersController.topAssists);
router.get('/details/:id', playersController.details);
router.get('/squad', playersController.squad);

export default router;

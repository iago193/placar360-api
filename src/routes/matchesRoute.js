import { Router } from "express";
import matchesController from '../controllers/matchesController.js';

const router = Router();

router.get('/live', matchesController.live);
router.get('/upcoming', matchesController.upcoming);
router.get('/results', matchesController.results);
router.get('/details/:id', matchesController.details);

export default router;

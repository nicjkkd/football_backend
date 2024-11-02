import { Router } from "express";
import playersRouter from "./players";
import teamsRuter from "./teams";
import leaguesRouter from "./leagues";

const router = Router();
router.use(playersRouter);
router.use(teamsRuter);
router.use(leaguesRouter);

export default router;

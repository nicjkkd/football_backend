import { Router } from "express";
import playersRouter from "./players";
import teamsRouter from "./teams";
import leaguesRouter from "./leagues";

const getRouter = (broadcast: (data: string) => void) => {
  const router = Router();
  router.use(playersRouter(broadcast));
  router.use(teamsRouter(broadcast));
  router.use(leaguesRouter(broadcast));
  return router;
};

export default getRouter;

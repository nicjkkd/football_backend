import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import {
  PlayerCreateManyInputSchema,
  PlayerUpdateManyMutationInputSchema,
} from "../../prisma/generated/zod";

const router = Router();
const prisma = new PrismaClient();

router.get("/api/players", async (request, response) => {
  // const { youngerThan, olderThan } = request.query;
  // const convertedYoungerThan = getQueryNumberValue(youngerThan);
  // const convertedOlderThan = getQueryNumberValue(olderThan);

  const players = await prisma.player.findMany();
  response.json(players);
});

router.get("/api/players/:id", async (request, response) => {
  const shoulIncludeTeam = request.query.includeTeam === "true";
  const player = await prisma.player.findUnique({
    where: { id: request.params.id },
    include: {
      Team: shoulIncludeTeam,
    },
  });
  console.log(player);
  response.json(player);
});

router.post("/api/players", async (request, response) => {
  try {
    const validatedPlayer = PlayerCreateManyInputSchema.parse(request.body);

    const isInvalidTeam =
      (!validatedPlayer.playerNumber && validatedPlayer.teamId) ||
      (validatedPlayer.playerNumber && !validatedPlayer.teamId);

    if (isInvalidTeam) {
      response.status(400).json({
        msg: "Player number && TeamId must be both provided or empty",
      });
    } else if (validatedPlayer.playerNumber && validatedPlayer.teamId) {
      const existedPlayer = await prisma.player.findFirst({
        where: {
          playerNumber: validatedPlayer.playerNumber,
          teamId: validatedPlayer.teamId,
        },
      });
      if (existedPlayer) {
        response.status(400).json({
          msg: "Player with this number and team already exists",
        });
      } else {
        const player = await prisma.player.create({ data: validatedPlayer });
        console.log(player);
        response.json(player);
      }
    } else {
      const player = await prisma.player.create({ data: validatedPlayer });
      console.log(player);
      response.json(player);
    }
  } catch (err) {
    response.status(400).json(err);
  }
});

router.delete("/api/players/:id", async (request, response) => {
  const player = await prisma.player.delete({
    where: { id: request.params.id },
  });
  console.log(player);
  response.json(player);
});

router.patch("/api/players/:id", async (request, response) => {
  const existingPlayer = await prisma.player.findUnique({
    where: { id: request.params.id },
  });

  if (!existingPlayer) {
    response.status(404).json({ msg: "Player with this id was not found" });
  } else {
    const validatedPlayer = PlayerUpdateManyMutationInputSchema.parse(
      request.body
    );

    const player = await prisma.player.update({
      data: validatedPlayer,
      where: { id: request.params.id },
    });

    console.log(player);
    response.json(player);
  }
});

export default router;

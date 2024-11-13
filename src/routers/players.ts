import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import {
  PlayerCreateManyInputSchema,
  PlayerUncheckedUpdateManyInputSchema,
  PlayerUpdateManyMutationInputSchema,
} from "../../prisma/generated/zod";
import { buildBirthDateFilterObj } from "../utils";

const router = Router();
const prisma = new PrismaClient();

router.get("/api/players", async (request, response) => {
  const { youngerThan, olderThan } = request.query;

  let convertedOlderThan;
  let convertedYoungerThan;

  if (youngerThan !== undefined) {
    if (typeof youngerThan === "string") {
      convertedYoungerThan = new Date(youngerThan);
    }
  }

  if (olderThan !== undefined) {
    if (typeof olderThan === "string") {
      convertedOlderThan = new Date(olderThan);
    }
  }

  // дати повинні пройти перевірку validate, не має бути Invalid Date (мають бути цифри)
  // якщо дата не в рамках 1000-3000 то повертаємо помилку (getFullYear() greater than ...)

  console.log(
    convertedOlderThan?.getFullYear(),
    convertedYoungerThan?.getFullYear()
  );

  if (convertedOlderThan !== undefined && convertedYoungerThan !== undefined) {
    const players = await prisma.player.findMany({
      where: buildBirthDateFilterObj(convertedYoungerThan, convertedOlderThan),
    });
    response.json(players);
  } else {
    const players = await prisma.player.findMany();
    response.json(players);
  }
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
  } else if (existingPlayer.teamId) {
    const validatedPlayer = PlayerUncheckedUpdateManyInputSchema.parse(
      request.body
    );

    const isInvalidTeam =
      (!validatedPlayer.playerNumber && validatedPlayer.teamId) ||
      (validatedPlayer.playerNumber && !validatedPlayer.teamId);

    if (isInvalidTeam) {
      response.status(400).json({
        msg: "Player number && TeamId must be both provided or empty",
      });
    }

    const player = await prisma.player.update({
      data: validatedPlayer,
      where: { id: request.params.id },
    });

    console.log(player);
    response.json(player);
  } else {
    const validatedPlayer = PlayerUpdateManyMutationInputSchema.parse(
      request.body
    );

    if (validatedPlayer.playerNumber) {
      response
        .status(404)
        .json({ msg: "Player team is null, playerNumber couldn't be changed" });
      return undefined;
    }

    const player = await prisma.player.update({
      data: validatedPlayer,
      where: { id: request.params.id },
    });

    console.log(player);
    response.json(player);
  }
});

export default router;

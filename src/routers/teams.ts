import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import {
  TeamCreateManyInputSchema,
  TeamUpdateManyMutationInputSchema,
} from "../../prisma/generated/zod";

const router = Router();
const prisma = new PrismaClient();

router.get("/api/teams", async (request, response) => {
  const teams = await prisma.team.findMany();
  console.log(teams);
  response.json(teams);
});

router.get("/api/teams/:id", async (request, response) => {
  const shoulIncludePlayers = request.query.includePlayers === "true";
  const shoulIncludeLeague = request.query.includeLeagues === "true";
  const team = await prisma.team.findUnique({
    where: { id: request.params.id },
    include: {
      players: shoulIncludePlayers,
      leagues: shoulIncludeLeague,
    },
  });
  console.log(team);
  response.json(team);
});

router.delete("/api/teams/:id", async (request, response) => {
  const team = await prisma.team.delete({
    where: { id: request.params.id },
  });
  console.log(team);
  response.json(team);
});

router.post("/api/teams", async (request, response) => {
  try {
    console.log(request.body);
    const validatedTeam = TeamCreateManyInputSchema.parse(request.body);

    const team = await prisma.team.create({ data: validatedTeam });
    console.log(team);
    response.json(team);
  } catch (err) {
    response.status(400).json(err);
  }
});

router.patch("/api/teams/:id", async (request, response) => {
  const existingteam = await prisma.team.findUnique({
    where: { id: request.params.id },
  });

  if (!existingteam) {
    response.status(404).json({ msg: "Team with this id was not found" });
  } else {
    const validatedTeam = TeamUpdateManyMutationInputSchema.parse(request.body);

    const team = await prisma.team.update({
      data: validatedTeam,
      where: { id: request.params.id },
    });

    console.log(team);
    response.json(team);
  }
});

router.patch("/api/teams/:id/players", async (request, response) => {
  const existingteam = await prisma.team.findUnique({
    where: { id: request.params.id },
  });

  if (!existingteam) {
    response.status(404).json({ msg: "Team with this id was not found" });
  } else if (!request.body || !Object.keys(request.body).length) {
    response.status(400).send({
      msg: "At least one field must be provided: playersIdToAdd or playersIdToRemove",
    });
  } else {
    console.log(request.body);

    const playersIdToAdd: string[] = Array.isArray(request.body?.playersIdToAdd)
      ? request.body?.playersIdToAdd
      : [];
    const playersToConnect = playersIdToAdd.map((id: string) => ({ id }));

    const playersIdToRemove: string[] = Array.isArray(
      request.body?.playersIdToRemove
    )
      ? request.body?.playersIdToRemove
      : [];
    const playersToDisconnect = playersIdToRemove.map((id: string) => ({ id }));

    if (!playersToConnect.length && !playersToDisconnect.length) {
      response.status(400).send({
        msg: "At least one field shoul not be empty: playersIdToAdd or playersIdToRemove",
      });
    }

    const updatedTeam = await prisma.team.update({
      where: { id: request.params.id },
      data: {
        players: {
          connect: playersToConnect,
          disconnect: playersToDisconnect,
        },
      },
      include: {
        players: true,
      },
    });
    response.json(updatedTeam);
    console.log(updatedTeam);
  }
});

router.patch("/api/teams/:id/leagues", async (request, response) => {
  const existingTeam = await prisma.team.findUnique({
    where: { id: request.params.id },
  });
  if (!existingTeam) {
    response.status(404).json({ msg: "Team with this id was not found" });
  } else if (!request.body || !Object.keys(request.body).length) {
    response.status(400).send({
      msg: "At least one field must be provided: leaguesIdToAdd or leaguesIdToRemove",
    });
  } else {
    const leaguesIdToAdd: string[] = Array.isArray(request.body.leaguesIdToAdd)
      ? request.body?.leaguesIdToAdd
      : [];
    const leaguesIdToConnect = leaguesIdToAdd.map((id: string) => ({ id }));

    const leaguesIdToRemove: string[] = Array.isArray(
      request.body.leaguesIdToRemove
    )
      ? request.body?.leaguesIdToRemove
      : [];
    const leaguesIdToDisconnect = leaguesIdToRemove.map((id: string) => ({
      id,
    }));

    console.log(leaguesIdToConnect, leaguesIdToDisconnect);
    if (!leaguesIdToConnect.length && !leaguesIdToDisconnect.length) {
      response.status(400).send({
        msg: "At least one field shoul not be empty: leaguesIdToAdd or leaguesIdToRemove",
      });
    }

    const updatedTeam = await prisma.team.update({
      where: { id: request.params.id },
      data: {
        leagues: {
          connect: leaguesIdToConnect,
          disconnect: leaguesIdToDisconnect,
        },
      },
      include: {
        leagues: true,
      },
    });

    console.log(updatedTeam);
    response.send(updatedTeam);
  }
});

export default router;

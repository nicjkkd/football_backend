import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import {
  TeamCreateManyInputSchema,
  TeamUpdateManyMutationInputSchema,
} from "../../prisma/generated/zod";
import { v4 as uuidv4 } from "uuid";
import { ActionTypes, TeamsWhere } from "../models";

console.log("Test1");

const getTeamsRouter = (broadcast: (data: string) => void) => {
  const router = Router();
  const prisma = new PrismaClient();

  router.get("/api/teams", async (request, response) => {
    const searchByLetters = request.query.nameQuery;
    let where: TeamsWhere | undefined;
    if (searchByLetters) {
      where = {
        teamName: {
          contains: `${searchByLetters}`,
        },
      };
    }
    const teams = await prisma.team.findMany({ where });
    response.json(teams);
    return;
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
    response.json(team);
  });

  router.delete("/api/teams/:id", async (request, response) => {
    const team = await prisma.team.delete({
      where: { id: request.params.id },
    });

    let eventId = uuidv4();
    response.json({ ...team, eventId: eventId });

    broadcast(
      JSON.stringify({
        operation: "invalidate",
        entity: ["teams"],
        type: ActionTypes.Delete,
        data: team,
        eventId: eventId,
      })
    );
  });

  router.post("/api/teams", async (request, response) => {
    try {
      const validatedTeam = TeamCreateManyInputSchema.parse(request.body);

      const team = await prisma.team.create({ data: validatedTeam });

      let eventId = uuidv4();
      response.json({ ...team, eventId: eventId });

      broadcast(
        JSON.stringify({
          operation: "invalidate",
          entity: ["teams"],
          type: ActionTypes.Create,
          data: team,
          eventId: eventId,
        })
      );
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
      const validatedTeam = TeamUpdateManyMutationInputSchema.parse(
        request.body
      );

      const team = await prisma.team.update({
        data: validatedTeam,
        where: { id: request.params.id },
      });

      let eventId = uuidv4();
      response.json({ ...team, eventId: eventId });

      broadcast(
        JSON.stringify({
          operation: "invalidate",
          entity: ["teams"],
          type: ActionTypes.Update,
          data: team,
          eventId: eventId,
        })
      );
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
      const playersIdToAdd: string[] = Array.isArray(
        request.body?.playersIdToAdd
      )
        ? request.body?.playersIdToAdd
        : [];
      const playersToConnect = playersIdToAdd.map((id: string) => ({ id }));

      const playersIdToRemove: string[] = Array.isArray(
        request.body?.playersIdToRemove
      )
        ? request.body?.playersIdToRemove
        : [];
      const playersToDisconnect = playersIdToRemove.map((id: string) => ({
        id,
      }));

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

      let eventId = uuidv4();
      response.json({ ...updatedTeam, eventId: eventId });

      broadcast(
        JSON.stringify({
          operation: "invalidate",
          entity: ["teams"],
          type: ActionTypes.Update,
          data: updatedTeam,
          eventId: eventId,
        })
      );
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
      const leaguesIdToAdd: string[] = Array.isArray(
        request.body.leaguesIdToAdd
      )
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

      let eventId = uuidv4();
      response.json({ ...updatedTeam, eventId: eventId });

      broadcast(
        JSON.stringify({
          operation: "invalidate",
          entity: ["teams"],
          type: ActionTypes.Update,
          data: updatedTeam,
          eventId: eventId,
        })
      );
    }
  });

  return router;
};

export default getTeamsRouter;

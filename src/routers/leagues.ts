import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import {
  LeagueCreateManyInputSchema,
  LeagueUpdateManyMutationInputSchema,
} from "../../prisma/generated/zod";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { ActionTypes } from "../models";

const getLeaguesRouter = (broadcast: (data: string) => void) => {
  const router = Router();
  const prisma = new PrismaClient();

  router.get("/api/leagues", async (request, response) => {
    const leagues = await prisma.league.findMany();
    response.json(leagues);
  });

  router.get("/api/leagues/:id", async (request, response) => {
    const shoulIncludeTeam = request.query.includeTeam === "true";
    const league = await prisma.league.findUnique({
      where: { id: request.params.id },
      include: {
        teams: shoulIncludeTeam,
      },
    });
    if (!league) response.status(404).json({ msg: "League not found" });

    response.json(league);
  });

  router.post("/api/leagues", async (request, response) => {
    const shoudIncludeTeam = request.query.includeTeam === "true";
    try {
      const LeagueSchema = z.object({
        teamsIdToAdd: z.array(z.string()).optional(),
        league: LeagueCreateManyInputSchema,
      });

      const validatedLeague = LeagueSchema.parse(request.body);

      const teamsIdToAdd: string[] = Array.isArray(request.body?.teamsIdToAdd)
        ? request.body?.teamsIdToAdd
        : [];
      const teamsToConnect = teamsIdToAdd.map((id: string) => ({ id }));

      const league = await prisma.league.create({
        data: {
          ...validatedLeague.league,
          teams: { connect: teamsToConnect },
        },
        include: {
          teams: shoudIncludeTeam,
        },
      });

      let eventId = uuidv4();
      response.json({ ...league, eventId: eventId });

      broadcast(
        JSON.stringify({
          operation: "invalidate",
          entity: ["leagues"],
          type: ActionTypes.Create,
          data: league,
          eventId: eventId,
        })
      );
    } catch (err) {
      response.status(400).json(err);
    }
  });

  router.patch("/api/leagues/:id/teams", async (request, response) => {
    const existingLeague = await prisma.league.findUnique({
      where: { id: request.params.id },
    });
    if (!existingLeague) {
      response.status(404).json({ msg: "League with this id was not found" });
    } else if (!request.body || !Object.keys(request.body).length) {
      response.status(400).send({
        msg: "At least one field must be provided: teamsIdToAdd or teamsIdToRemove",
      });
    } else {
      const teamsIdToAdd: string[] = Array.isArray(request.body?.teamsIdToAdd)
        ? request.body?.teamsIdToAdd
        : [];
      const teamsToConnect = teamsIdToAdd.map((id: string) => ({ id }));

      const teamsIdToRemove: string[] = Array.isArray(
        request.body?.teamsIdToRemove
      )
        ? request.body?.teamsIdToRemove
        : [];
      const teamsToDisconnect = teamsIdToRemove.map((id: string) => ({ id }));

      if (!teamsToConnect.length && !teamsToDisconnect.length) {
        response.status(400).send({
          msg: "At least one field should not be empty: teamsIdToAdd or teamsIdToRemove",
        });
      }

      const updatedLeague = await prisma.league.update({
        where: { id: request.params.id },
        data: {
          teams: {
            connect: teamsToConnect,
            disconnect: teamsToDisconnect,
          },
        },
        include: {
          teams: true,
        },
      });

      let eventId = uuidv4();

      response.json({ ...updatedLeague, eventId: eventId });

      broadcast(
        JSON.stringify({
          operation: "invalidate",
          entity: ["leagues"],
          type: ActionTypes.Update,
          data: updatedLeague,
          eventId: eventId,
        })
      );
    }
  });

  router.delete("/api/leagues/:id", async (request, response) => {
    const deletedLeague = await prisma.league.delete({
      where: { id: request.params.id },
    });

    let eventId = uuidv4();
    response.json({ ...deletedLeague, eventId: eventId });

    broadcast(
      JSON.stringify({
        operation: "invalidate",
        entity: ["leagues"],
        type: ActionTypes.Delete,
        data: deletedLeague,
        eventId: eventId,
      })
    );
  });

  router.patch("/api/leagues/:id", async (request, response) => {
    const existinLeague = await prisma.league.findUnique({
      where: { id: request.params.id },
    });

    if (!existinLeague) {
      response.status(404).json({ msg: "League with this id was not found" });
    } else {
      const validatedLeague = LeagueUpdateManyMutationInputSchema.parse(
        request.body
      );

      const league = await prisma.league.update({
        data: validatedLeague,
        where: { id: request.params.id },
      });

      let eventId = uuidv4();
      response.json({ ...league, eventId: eventId });

      broadcast(
        JSON.stringify({
          operation: "invalidate",
          entity: ["leagues"],
          type: ActionTypes.Update,
          data: league,
          eventId: eventId,
        })
      );
    }
  });

  return router;
};

export default getLeaguesRouter;

import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import {
  PlayerCreateManyInputSchema,
  PlayerUncheckedUpdateManyInputSchema,
} from "../../prisma/generated/zod";
import {
  buildBirthDateFilterObj,
  checkAgeLimitInput,
  isValidDate,
  sendResponseWithBroadcast,
} from "../utils";
import { OperationTypes } from "../models";

const broadcastEntity = "players";

const getPlayersRouter = (broadcast: (data: string) => void) => {
  const router = Router();
  const prisma = new PrismaClient();

  router.get("/api/players", async (request, response) => {
    const { youngerThan, olderThan } = request.query;

    let convertedOlderThan;
    let convertedYoungerThan;

    if (youngerThan !== undefined) {
      if (
        typeof youngerThan === "string" &&
        isValidDate(new Date(youngerThan))
      ) {
        convertedYoungerThan = new Date(youngerThan);
      } else {
        response
          .status(400)
          .json({ msg: "Invalid youngerThan date param provided" });
        return undefined;
      }
    }

    if (olderThan !== undefined) {
      if (typeof olderThan === "string" && isValidDate(new Date(olderThan))) {
        convertedOlderThan = new Date(olderThan);
      } else {
        response
          .status(400)
          .json({ msg: "Invalid olderThan date param provided" });
        return undefined;
      }
    }

    if (
      convertedOlderThan !== undefined &&
      convertedYoungerThan !== undefined
    ) {
      const isValidOlder = checkAgeLimitInput(convertedOlderThan);
      const isValidYoungerThan = checkAgeLimitInput(convertedYoungerThan);
      if (isValidOlder && isValidYoungerThan) {
        const players = await prisma.player.findMany({
          where: buildBirthDateFilterObj(
            convertedYoungerThan,
            convertedOlderThan
          ),
        });
        response.json(players);
      } else {
        response.status(400).json({
          msg: "Invalid date time, expected: olderThan > 1000, youngerThan < 3000",
        });
        return undefined;
      }
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

          let responsePayload = {
            operation: OperationTypes.create,
            entity: [broadcastEntity],
            data: player,
            id: player.id,
          };

          sendResponseWithBroadcast({ response, broadcast, responsePayload });
        }
      } else {
        const player = await prisma.player.create({ data: validatedPlayer });

        let responsePayload = {
          operation: OperationTypes.create,
          entity: [broadcastEntity],
          data: player,
          id: player.id,
        };

        sendResponseWithBroadcast({ response, broadcast, responsePayload });
      }
    } catch (err) {
      response.status(400).json(err);
    }
  });

  router.delete("/api/players/:id", async (request, response) => {
    const player = await prisma.player.delete({
      where: { id: request.params.id },
    });

    let responsePayload = {
      operation: OperationTypes.delete,
      entity: [broadcastEntity],
      data: player,
      id: player.id,
    };

    sendResponseWithBroadcast({ response, broadcast, responsePayload });
  });

  router.patch("/api/players/:id", async (request, response) => {
    const existingPlayer = await prisma.player.findUnique({
      where: { id: request.params.id },
    });

    if (!existingPlayer) {
      response.status(404).json({ msg: "Player with this id was not found" });
    } else if (existingPlayer.teamId && existingPlayer.playerNumber) {
      const validatedPlayer = PlayerUncheckedUpdateManyInputSchema.parse(
        request.body
      );

      const isTheSameNumberAndTeam =
        existingPlayer.teamId === request.body.teamId &&
        existingPlayer.playerNumber === request.body.playerNumber;

      const isUpdatePlayerWithTeamAndNumber =
        request.body.playerNumber &&
        request.body.teamId &&
        !isTheSameNumberAndTeam;

      const isUpdatePlayerWithTeamOrNumber =
        (request.body.playerNumber || request.body.teamId) &&
        !isTheSameNumberAndTeam;

      if (isUpdatePlayerWithTeamAndNumber) {
        const playerWithTheSamePlayerNumberAndTeam =
          await prisma.player.findFirst({
            where: {
              playerNumber: request.body.playerNumber,
              teamId: request.body.teamId,
            },
          });
        if (playerWithTheSamePlayerNumberAndTeam) {
          response.status(400).json({
            msg: "Player with this number and team already exists",
          });
          return undefined;
        }
      } else if (isUpdatePlayerWithTeamOrNumber) {
        const playerWithTheSamePlayerNumberAndTeam =
          await prisma.player.findFirst({
            where: {
              playerNumber:
                request.body.playerNumber || existingPlayer.playerNumber,
              teamId: request.body.teamId || existingPlayer.teamId,
            },
          });
        if (playerWithTheSamePlayerNumberAndTeam) {
          response.status(400).json({
            msg: "Player with this number and team already exists",
          });
          return undefined;
        }
      }

      const player = await prisma.player.update({
        data: validatedPlayer,
        where: { id: request.params.id },
      });

      let responsePayload = {
        operation: OperationTypes.update,
        entity: [broadcastEntity],
        data: player,
        id: player.id,
      };

      sendResponseWithBroadcast({ response, broadcast, responsePayload });
    } else {
      const validatedPlayer = PlayerUncheckedUpdateManyInputSchema.parse(
        request.body
      );

      if (validatedPlayer.teamId || validatedPlayer.playerNumber) {
        const isTeamProvided =
          validatedPlayer.teamId && !validatedPlayer.playerNumber;
        const isPlayerNumberProvided =
          validatedPlayer.playerNumber && !validatedPlayer.teamId;

        if (isPlayerNumberProvided) {
          response.status(404).json({
            msg: "Player team is null, playerNumber couldn't be changed",
          });
          return undefined;
        }

        if (isTeamProvided) {
          response
            .status(404)
            .json({ msg: "Player number is null, teamId couldn't be changed" });
          return undefined;
        }

        const playerWithTheSamePlayerNumberAndTeam =
          await prisma.player.findFirst({
            where: {
              playerNumber: request.body.playerNumber,
              teamId: request.body.teamId,
            },
          });

        if (playerWithTheSamePlayerNumberAndTeam) {
          response.status(400).json({
            msg: "Player with this number and team already exists",
          });
          return undefined;
        }
      }
      const player = await prisma.player.update({
        data: validatedPlayer,
        where: { id: request.params.id },
      });

      let responsePayload = {
        operation: OperationTypes.update,
        entity: [broadcastEntity],
        data: player,
        id: player.id,
      };

      sendResponseWithBroadcast({ response, broadcast, responsePayload });
    }
  });

  return router;
};

export default getPlayersRouter;

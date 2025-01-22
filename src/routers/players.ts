import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import {
  PlayerCreateManyInputSchema,
  PlayerUncheckedUpdateManyInputSchema,
} from "../../prisma/generated/zod";
import {
  broadcastResponse,
  buildBirthDateFilterObj,
  checkAgeLimitInput,
  isValidDate,
} from "../utils";
import { OperationTypes } from "../models";

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

          // let eventId = uuidv4();
          // response.json({ ...player, eventId: eventId });

          // broadcast(
          //   JSON.stringify({
          //     operation: "create",
          //     entity: ["players"],
          //     data: player,
          //     id: player.id,
          //     eventId: eventId,
          //   })
          // );

          response.json(
            broadcastResponse(
              {
                operation: OperationTypes.create,
                entity: ["players"],
                responseEntityObject: player,
                id: player.id,
              },
              broadcast
            )
          );
        }
      } else {
        const player = await prisma.player.create({ data: validatedPlayer });

        // let eventId = uuidv4();
        // response.json({ ...player, eventId: eventId });

        // broadcast(
        //   JSON.stringify({
        //     operation: "create",
        //     entity: ["players"],
        //     data: player,
        //     id: player.id,
        //     eventId: eventId,
        //   })
        // );

        response.json(
          broadcastResponse(
            {
              operation: OperationTypes.create,
              entity: ["players"],
              responseEntityObject: player,
              id: player.id,
            },
            broadcast
          )
        );
      }
    } catch (err) {
      response.status(400).json(err);
    }
  });

  router.delete("/api/players/:id", async (request, response) => {
    const player = await prisma.player.delete({
      where: { id: request.params.id },
    });

    // let eventId = uuidv4();
    // response.json({ ...player, eventId: eventId });

    // broadcast(
    //   JSON.stringify({
    //     operation: "delete",
    //     entity: ["players"],
    //     data: player,
    //     id: player.id,
    //     eventId: eventId,
    //   })
    // );

    response.json(
      broadcastResponse(
        {
          operation: OperationTypes.delete,
          entity: ["players"],
          responseEntityObject: player,
          id: player.id,
        },
        broadcast
      )
    );
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

      // let eventId = uuidv4();
      // response.json({ ...player, eventId: eventId });

      // broadcast(
      //   JSON.stringify({
      //     operation: "update",
      //     entity: ["players"],
      //     data: player,
      //     id: player.id,
      //     eventId: eventId,
      //   })
      // );

      response.json(
        broadcastResponse(
          {
            operation: OperationTypes.update,
            entity: ["players"],
            responseEntityObject: player,
            id: player.id,
          },
          broadcast
        )
      );
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

      // response.json({ ...player, eventId: eventId });

      // broadcast(
      //   JSON.stringify({
      //     operation: "update",
      //     entity: ["players"],
      //     data: player,
      //     id: player.id,
      //     eventId: eventId,
      //   })
      // );

      response.json(
        broadcastResponse(
          {
            operation: OperationTypes.update,
            entity: ["players"],
            responseEntityObject: player,
            id: player.id,
          },
          broadcast
        )
      );
    }
  });

  return router;
};

export default getPlayersRouter;

import { z } from "zod";
import type { Prisma } from "@prisma/client";

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum([
  "ReadUncommitted",
  "ReadCommitted",
  "RepeatableRead",
  "Serializable",
]);

export const PlayerScalarFieldEnumSchema = z.enum([
  "id",
  "firstName",
  "lastName",
  "dateBirth",
  "position",
  "playerNumber",
  "teamId",
  "createdAt",
  "updatedAt",
]);

export const TeamScalarFieldEnumSchema = z.enum([
  "id",
  "teamName",
  "city",
  "since",
  "createdAt",
  "updatedAt",
]);

export const LeagueScalarFieldEnumSchema = z.enum([
  "id",
  "leagueName",
  "createdAt",
  "updatedAt",
]);

export const SortOrderSchema = z.enum(["asc", "desc"]);

export const NullsOrderSchema = z.enum(["first", "last"]);

export const PositionSchema = z.enum([
  "BENCH",
  "GK",
  "SW",
  "LB",
  "LCB",
  "CB",
  "RCB",
  "RB",
  "LWB",
  "LDM",
  "CDM",
  "RDM",
  "RWB",
  "LM",
  "LCM",
  "CM",
  "RCM",
  "RM",
  "LW",
  "LAM",
  "CAM",
  "RAM",
  "RW",
  "LS",
  "CS",
  "RS",
]);

export type PositionType = `${z.infer<typeof PositionSchema>}`;

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// PLAYER SCHEMA
/////////////////////////////////////////

export const PlayerSchema = z.object({
  position: PositionSchema.nullable(),
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  dateBirth: z.coerce.date().nullable(),
  playerNumber: z.number().int().nullable(),
  teamId: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Player = z.infer<typeof PlayerSchema>;

/////////////////////////////////////////
// TEAM SCHEMA
/////////////////////////////////////////

export const TeamSchema = z.object({
  id: z.string(),
  teamName: z.string(),
  city: z.string(),
  since: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Team = z.infer<typeof TeamSchema>;

/////////////////////////////////////////
// LEAGUE SCHEMA
/////////////////////////////////////////

export const LeagueSchema = z.object({
  id: z.string(),
  leagueName: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type League = z.infer<typeof LeagueSchema>;

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// PLAYER
//------------------------------------------------------

export const PlayerIncludeSchema: z.ZodType<Prisma.PlayerInclude> = z
  .object({
    Team: z.union([z.boolean(), z.lazy(() => TeamArgsSchema)]).optional(),
  })
  .strict();

export const PlayerArgsSchema: z.ZodType<Prisma.PlayerDefaultArgs> = z
  .object({
    select: z.lazy(() => PlayerSelectSchema).optional(),
    include: z.lazy(() => PlayerIncludeSchema).optional(),
  })
  .strict();

export const PlayerSelectSchema: z.ZodType<Prisma.PlayerSelect> = z
  .object({
    id: z.boolean().optional(),
    firstName: z.boolean().optional(),
    lastName: z.boolean().optional(),
    dateBirth: z.boolean().optional(),
    position: z.boolean().optional(),
    playerNumber: z.boolean().optional(),
    teamId: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    Team: z.union([z.boolean(), z.lazy(() => TeamArgsSchema)]).optional(),
  })
  .strict();

// TEAM
//------------------------------------------------------

export const TeamIncludeSchema: z.ZodType<Prisma.TeamInclude> = z
  .object({
    players: z
      .union([z.boolean(), z.lazy(() => PlayerFindManyArgsSchema)])
      .optional(),
    leagues: z
      .union([z.boolean(), z.lazy(() => LeagueFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => TeamCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const TeamArgsSchema: z.ZodType<Prisma.TeamDefaultArgs> = z
  .object({
    select: z.lazy(() => TeamSelectSchema).optional(),
    include: z.lazy(() => TeamIncludeSchema).optional(),
  })
  .strict();

export const TeamCountOutputTypeArgsSchema: z.ZodType<Prisma.TeamCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => TeamCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const TeamCountOutputTypeSelectSchema: z.ZodType<Prisma.TeamCountOutputTypeSelect> =
  z
    .object({
      players: z.boolean().optional(),
      leagues: z.boolean().optional(),
    })
    .strict();

export const TeamSelectSchema: z.ZodType<Prisma.TeamSelect> = z
  .object({
    id: z.boolean().optional(),
    teamName: z.boolean().optional(),
    city: z.boolean().optional(),
    since: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    players: z
      .union([z.boolean(), z.lazy(() => PlayerFindManyArgsSchema)])
      .optional(),
    leagues: z
      .union([z.boolean(), z.lazy(() => LeagueFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => TeamCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// LEAGUE
//------------------------------------------------------

export const LeagueIncludeSchema: z.ZodType<Prisma.LeagueInclude> = z
  .object({
    teams: z
      .union([z.boolean(), z.lazy(() => TeamFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => LeagueCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const LeagueArgsSchema: z.ZodType<Prisma.LeagueDefaultArgs> = z
  .object({
    select: z.lazy(() => LeagueSelectSchema).optional(),
    include: z.lazy(() => LeagueIncludeSchema).optional(),
  })
  .strict();

export const LeagueCountOutputTypeArgsSchema: z.ZodType<Prisma.LeagueCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => LeagueCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const LeagueCountOutputTypeSelectSchema: z.ZodType<Prisma.LeagueCountOutputTypeSelect> =
  z
    .object({
      teams: z.boolean().optional(),
    })
    .strict();

export const LeagueSelectSchema: z.ZodType<Prisma.LeagueSelect> = z
  .object({
    id: z.boolean().optional(),
    leagueName: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    teams: z
      .union([z.boolean(), z.lazy(() => TeamFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => LeagueCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const PlayerWhereInputSchema: z.ZodType<Prisma.PlayerWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => PlayerWhereInputSchema),
        z.lazy(() => PlayerWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => PlayerWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => PlayerWhereInputSchema),
        z.lazy(() => PlayerWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    firstName: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    lastName: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    dateBirth: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    position: z
      .union([
        z.lazy(() => EnumPositionNullableFilterSchema),
        z.lazy(() => PositionSchema),
      ])
      .optional()
      .nullable(),
    playerNumber: z
      .union([z.lazy(() => IntNullableFilterSchema), z.number()])
      .optional()
      .nullable(),
    teamId: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    Team: z
      .union([
        z.lazy(() => TeamNullableRelationFilterSchema),
        z.lazy(() => TeamWhereInputSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict();

export const PlayerOrderByWithRelationInputSchema: z.ZodType<Prisma.PlayerOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      firstName: z.lazy(() => SortOrderSchema).optional(),
      lastName: z.lazy(() => SortOrderSchema).optional(),
      dateBirth: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      position: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      playerNumber: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      teamId: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      Team: z.lazy(() => TeamOrderByWithRelationInputSchema).optional(),
    })
    .strict();

export const PlayerWhereUniqueInputSchema: z.ZodType<Prisma.PlayerWhereUniqueInput> =
  z
    .object({
      id: z.string(),
    })
    .and(
      z
        .object({
          id: z.string().optional(),
          AND: z
            .union([
              z.lazy(() => PlayerWhereInputSchema),
              z.lazy(() => PlayerWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => PlayerWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => PlayerWhereInputSchema),
              z.lazy(() => PlayerWhereInputSchema).array(),
            ])
            .optional(),
          firstName: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          lastName: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          dateBirth: z
            .union([
              z.lazy(() => DateTimeNullableFilterSchema),
              z.coerce.date(),
            ])
            .optional()
            .nullable(),
          position: z
            .union([
              z.lazy(() => EnumPositionNullableFilterSchema),
              z.lazy(() => PositionSchema),
            ])
            .optional()
            .nullable(),
          playerNumber: z
            .union([z.lazy(() => IntNullableFilterSchema), z.number().int()])
            .optional()
            .nullable(),
          teamId: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          updatedAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          Team: z
            .union([
              z.lazy(() => TeamNullableRelationFilterSchema),
              z.lazy(() => TeamWhereInputSchema),
            ])
            .optional()
            .nullable(),
        })
        .strict()
    );

export const PlayerOrderByWithAggregationInputSchema: z.ZodType<Prisma.PlayerOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      firstName: z.lazy(() => SortOrderSchema).optional(),
      lastName: z.lazy(() => SortOrderSchema).optional(),
      dateBirth: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      position: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      playerNumber: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      teamId: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => PlayerCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => PlayerAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => PlayerMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => PlayerMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => PlayerSumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const PlayerScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PlayerScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => PlayerScalarWhereWithAggregatesInputSchema),
          z.lazy(() => PlayerScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => PlayerScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => PlayerScalarWhereWithAggregatesInputSchema),
          z.lazy(() => PlayerScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      firstName: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      lastName: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      dateBirth: z
        .union([
          z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional()
        .nullable(),
      position: z
        .union([
          z.lazy(() => EnumPositionNullableWithAggregatesFilterSchema),
          z.lazy(() => PositionSchema),
        ])
        .optional()
        .nullable(),
      playerNumber: z
        .union([
          z.lazy(() => IntNullableWithAggregatesFilterSchema),
          z.number(),
        ])
        .optional()
        .nullable(),
      teamId: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
    })
    .strict();

export const TeamWhereInputSchema: z.ZodType<Prisma.TeamWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => TeamWhereInputSchema),
        z.lazy(() => TeamWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => TeamWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => TeamWhereInputSchema),
        z.lazy(() => TeamWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    teamName: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    city: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    since: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    players: z.lazy(() => PlayerListRelationFilterSchema).optional(),
    leagues: z.lazy(() => LeagueListRelationFilterSchema).optional(),
  })
  .strict();

export const TeamOrderByWithRelationInputSchema: z.ZodType<Prisma.TeamOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      teamName: z.lazy(() => SortOrderSchema).optional(),
      city: z.lazy(() => SortOrderSchema).optional(),
      since: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      players: z
        .lazy(() => PlayerOrderByRelationAggregateInputSchema)
        .optional(),
      leagues: z
        .lazy(() => LeagueOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict();

export const TeamWhereUniqueInputSchema: z.ZodType<Prisma.TeamWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.string(),
        teamName: z.string(),
      }),
      z.object({
        id: z.string(),
      }),
      z.object({
        teamName: z.string(),
      }),
    ])
    .and(
      z
        .object({
          id: z.string().optional(),
          teamName: z.string().optional(),
          AND: z
            .union([
              z.lazy(() => TeamWhereInputSchema),
              z.lazy(() => TeamWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => TeamWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => TeamWhereInputSchema),
              z.lazy(() => TeamWhereInputSchema).array(),
            ])
            .optional(),
          city: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          since: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          updatedAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          players: z.lazy(() => PlayerListRelationFilterSchema).optional(),
          leagues: z.lazy(() => LeagueListRelationFilterSchema).optional(),
        })
        .strict()
    );

export const TeamOrderByWithAggregationInputSchema: z.ZodType<Prisma.TeamOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      teamName: z.lazy(() => SortOrderSchema).optional(),
      city: z.lazy(() => SortOrderSchema).optional(),
      since: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => TeamCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => TeamAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => TeamMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => TeamMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => TeamSumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const TeamScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TeamScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => TeamScalarWhereWithAggregatesInputSchema),
          z.lazy(() => TeamScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => TeamScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => TeamScalarWhereWithAggregatesInputSchema),
          z.lazy(() => TeamScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      teamName: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      city: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      since: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
    })
    .strict();

export const LeagueWhereInputSchema: z.ZodType<Prisma.LeagueWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => LeagueWhereInputSchema),
        z.lazy(() => LeagueWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => LeagueWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => LeagueWhereInputSchema),
        z.lazy(() => LeagueWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    leagueName: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    teams: z.lazy(() => TeamListRelationFilterSchema).optional(),
  })
  .strict();

export const LeagueOrderByWithRelationInputSchema: z.ZodType<Prisma.LeagueOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      leagueName: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      teams: z.lazy(() => TeamOrderByRelationAggregateInputSchema).optional(),
    })
    .strict();

export const LeagueWhereUniqueInputSchema: z.ZodType<Prisma.LeagueWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.string(),
        leagueName: z.string(),
      }),
      z.object({
        id: z.string(),
      }),
      z.object({
        leagueName: z.string(),
      }),
    ])
    .and(
      z
        .object({
          id: z.string().optional(),
          leagueName: z.string().optional(),
          AND: z
            .union([
              z.lazy(() => LeagueWhereInputSchema),
              z.lazy(() => LeagueWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => LeagueWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => LeagueWhereInputSchema),
              z.lazy(() => LeagueWhereInputSchema).array(),
            ])
            .optional(),
          createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          updatedAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          teams: z.lazy(() => TeamListRelationFilterSchema).optional(),
        })
        .strict()
    );

export const LeagueOrderByWithAggregationInputSchema: z.ZodType<Prisma.LeagueOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      leagueName: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => LeagueCountOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => LeagueMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => LeagueMinOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const LeagueScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.LeagueScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => LeagueScalarWhereWithAggregatesInputSchema),
          z.lazy(() => LeagueScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => LeagueScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => LeagueScalarWhereWithAggregatesInputSchema),
          z.lazy(() => LeagueScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      leagueName: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
    })
    .strict();

export const PlayerCreateInputSchema: z.ZodType<Prisma.PlayerCreateInput> = z
  .object({
    id: z.string().optional(),
    firstName: z.string(),
    lastName: z.string(),
    dateBirth: z.coerce.date().optional().nullable(),
    position: z
      .lazy(() => PositionSchema)
      .optional()
      .nullable(),
    playerNumber: z.number().int().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    Team: z.lazy(() => TeamCreateNestedOneWithoutPlayersInputSchema).optional(),
  })
  .strict();

export const PlayerUncheckedCreateInputSchema: z.ZodType<Prisma.PlayerUncheckedCreateInput> =
  z
    .object({
      id: z.string().optional(),
      firstName: z.string(),
      lastName: z.string(),
      dateBirth: z.coerce.date().optional().nullable(),
      position: z
        .lazy(() => PositionSchema)
        .optional()
        .nullable(),
      playerNumber: z.number().int().optional().nullable(),
      teamId: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const PlayerUpdateInputSchema: z.ZodType<Prisma.PlayerUpdateInput> = z
  .object({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    firstName: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    lastName: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    dateBirth: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    position: z
      .union([
        z.lazy(() => PositionSchema),
        z.lazy(() => NullableEnumPositionFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    playerNumber: z
      .union([
        z.number().int(),
        z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    Team: z.lazy(() => TeamUpdateOneWithoutPlayersNestedInputSchema).optional(),
  })
  .strict();

export const PlayerUncheckedUpdateInputSchema: z.ZodType<Prisma.PlayerUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      firstName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      lastName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      dateBirth: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      position: z
        .union([
          z.lazy(() => PositionSchema),
          z.lazy(() => NullableEnumPositionFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      playerNumber: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      teamId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const PlayerCreateManyInputSchema: z.ZodType<Prisma.PlayerCreateManyInput> =
  z
    .object({
      id: z.string().optional(),
      firstName: z.string(),
      lastName: z.string(),
      dateBirth: z.coerce.date().optional().nullable(),
      position: z
        .lazy(() => PositionSchema)
        .optional()
        .nullable(),
      playerNumber: z.number().int().optional().nullable(),
      teamId: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const PlayerUpdateManyMutationInputSchema: z.ZodType<Prisma.PlayerUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      firstName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      lastName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      dateBirth: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      position: z
        .union([
          z.lazy(() => PositionSchema),
          z.lazy(() => NullableEnumPositionFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      playerNumber: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const PlayerUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PlayerUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      firstName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      lastName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      dateBirth: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      position: z
        .union([
          z.lazy(() => PositionSchema),
          z.lazy(() => NullableEnumPositionFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      playerNumber: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      teamId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TeamCreateInputSchema: z.ZodType<Prisma.TeamCreateInput> = z
  .object({
    id: z.string().optional(),
    teamName: z.string(),
    city: z.string(),
    since: z.number().int(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    players: z
      .lazy(() => PlayerCreateNestedManyWithoutTeamInputSchema)
      .optional(),
    leagues: z
      .lazy(() => LeagueCreateNestedManyWithoutTeamsInputSchema)
      .optional(),
  })
  .strict();

export const TeamUncheckedCreateInputSchema: z.ZodType<Prisma.TeamUncheckedCreateInput> =
  z
    .object({
      id: z.string().optional(),
      teamName: z.string(),
      city: z.string(),
      since: z.number().int(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      players: z
        .lazy(() => PlayerUncheckedCreateNestedManyWithoutTeamInputSchema)
        .optional(),
      leagues: z
        .lazy(() => LeagueUncheckedCreateNestedManyWithoutTeamsInputSchema)
        .optional(),
    })
    .strict();

export const TeamUpdateInputSchema: z.ZodType<Prisma.TeamUpdateInput> = z
  .object({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    teamName: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    city: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    since: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    players: z
      .lazy(() => PlayerUpdateManyWithoutTeamNestedInputSchema)
      .optional(),
    leagues: z
      .lazy(() => LeagueUpdateManyWithoutTeamsNestedInputSchema)
      .optional(),
  })
  .strict();

export const TeamUncheckedUpdateInputSchema: z.ZodType<Prisma.TeamUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      teamName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      city: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      since: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      players: z
        .lazy(() => PlayerUncheckedUpdateManyWithoutTeamNestedInputSchema)
        .optional(),
      leagues: z
        .lazy(() => LeagueUncheckedUpdateManyWithoutTeamsNestedInputSchema)
        .optional(),
    })
    .strict();

export const TeamCreateManyInputSchema: z.ZodType<Prisma.TeamCreateManyInput> =
  z
    .object({
      id: z.string().optional(),
      teamName: z.string(),
      city: z.string(),
      since: z.number().int(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const TeamUpdateManyMutationInputSchema: z.ZodType<Prisma.TeamUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      teamName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      city: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      since: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TeamUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TeamUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      teamName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      city: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      since: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const LeagueCreateInputSchema: z.ZodType<Prisma.LeagueCreateInput> = z
  .object({
    id: z.string().optional(),
    leagueName: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    teams: z
      .lazy(() => TeamCreateNestedManyWithoutLeaguesInputSchema)
      .optional(),
  })
  .strict();

export const LeagueUncheckedCreateInputSchema: z.ZodType<Prisma.LeagueUncheckedCreateInput> =
  z
    .object({
      id: z.string().optional(),
      leagueName: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      teams: z
        .lazy(() => TeamUncheckedCreateNestedManyWithoutLeaguesInputSchema)
        .optional(),
    })
    .strict();

export const LeagueUpdateInputSchema: z.ZodType<Prisma.LeagueUpdateInput> = z
  .object({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    leagueName: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    teams: z
      .lazy(() => TeamUpdateManyWithoutLeaguesNestedInputSchema)
      .optional(),
  })
  .strict();

export const LeagueUncheckedUpdateInputSchema: z.ZodType<Prisma.LeagueUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      leagueName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      teams: z
        .lazy(() => TeamUncheckedUpdateManyWithoutLeaguesNestedInputSchema)
        .optional(),
    })
    .strict();

export const LeagueCreateManyInputSchema: z.ZodType<Prisma.LeagueCreateManyInput> =
  z
    .object({
      id: z.string().optional(),
      leagueName: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const LeagueUpdateManyMutationInputSchema: z.ZodType<Prisma.LeagueUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      leagueName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const LeagueUncheckedUpdateManyInputSchema: z.ZodType<Prisma.LeagueUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      leagueName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
      .optional(),
  })
  .strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> =
  z
    .object({
      equals: z.coerce.date().optional().nullable(),
      in: z.coerce.date().array().optional().nullable(),
      notIn: z.coerce.date().array().optional().nullable(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeNullableFilterSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const EnumPositionNullableFilterSchema: z.ZodType<Prisma.EnumPositionNullableFilter> =
  z
    .object({
      equals: z
        .lazy(() => PositionSchema)
        .optional()
        .nullable(),
      in: z
        .lazy(() => PositionSchema)
        .array()
        .optional()
        .nullable(),
      notIn: z
        .lazy(() => PositionSchema)
        .array()
        .optional()
        .nullable(),
      not: z
        .union([
          z.lazy(() => PositionSchema),
          z.lazy(() => NestedEnumPositionNullableFilterSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z
  .object({
    equals: z.number().optional().nullable(),
    in: z.number().array().optional().nullable(),
    notIn: z.number().array().optional().nullable(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)])
      .optional()
      .nullable(),
  })
  .strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z
  .object({
    equals: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    notIn: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z
      .union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
      .optional(),
  })
  .strict();

export const TeamNullableRelationFilterSchema: z.ZodType<Prisma.TeamNullableRelationFilter> =
  z
    .object({
      is: z
        .lazy(() => TeamWhereInputSchema)
        .optional()
        .nullable(),
      isNot: z
        .lazy(() => TeamWhereInputSchema)
        .optional()
        .nullable(),
    })
    .strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z
  .object({
    sort: z.lazy(() => SortOrderSchema),
    nulls: z.lazy(() => NullsOrderSchema).optional(),
  })
  .strict();

export const PlayerCountOrderByAggregateInputSchema: z.ZodType<Prisma.PlayerCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      firstName: z.lazy(() => SortOrderSchema).optional(),
      lastName: z.lazy(() => SortOrderSchema).optional(),
      dateBirth: z.lazy(() => SortOrderSchema).optional(),
      position: z.lazy(() => SortOrderSchema).optional(),
      playerNumber: z.lazy(() => SortOrderSchema).optional(),
      teamId: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const PlayerAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PlayerAvgOrderByAggregateInput> =
  z
    .object({
      playerNumber: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const PlayerMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PlayerMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      firstName: z.lazy(() => SortOrderSchema).optional(),
      lastName: z.lazy(() => SortOrderSchema).optional(),
      dateBirth: z.lazy(() => SortOrderSchema).optional(),
      position: z.lazy(() => SortOrderSchema).optional(),
      playerNumber: z.lazy(() => SortOrderSchema).optional(),
      teamId: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const PlayerMinOrderByAggregateInputSchema: z.ZodType<Prisma.PlayerMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      firstName: z.lazy(() => SortOrderSchema).optional(),
      lastName: z.lazy(() => SortOrderSchema).optional(),
      dateBirth: z.lazy(() => SortOrderSchema).optional(),
      position: z.lazy(() => SortOrderSchema).optional(),
      playerNumber: z.lazy(() => SortOrderSchema).optional(),
      teamId: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const PlayerSumOrderByAggregateInputSchema: z.ZodType<Prisma.PlayerSumOrderByAggregateInput> =
  z
    .object({
      playerNumber: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional(),
      in: z.string().array().optional(),
      notIn: z.string().array().optional(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedStringFilterSchema).optional(),
      _max: z.lazy(() => NestedStringFilterSchema).optional(),
    })
    .strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.coerce.date().optional().nullable(),
      in: z.coerce.date().array().optional().nullable(),
      notIn: z.coerce.date().array().optional().nullable(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
    })
    .strict();

export const EnumPositionNullableWithAggregatesFilterSchema: z.ZodType<Prisma.EnumPositionNullableWithAggregatesFilter> =
  z
    .object({
      equals: z
        .lazy(() => PositionSchema)
        .optional()
        .nullable(),
      in: z
        .lazy(() => PositionSchema)
        .array()
        .optional()
        .nullable(),
      notIn: z
        .lazy(() => PositionSchema)
        .array()
        .optional()
        .nullable(),
      not: z
        .union([
          z.lazy(() => PositionSchema),
          z.lazy(() => NestedEnumPositionNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumPositionNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumPositionNullableFilterSchema).optional(),
    })
    .strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([
          z.number(),
          z.lazy(() => NestedIntNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    })
    .strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    })
    .strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> =
  z
    .object({
      equals: z.coerce.date().optional(),
      in: z.coerce.date().array().optional(),
      notIn: z.coerce.date().array().optional(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    })
    .strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
  })
  .strict();

export const PlayerListRelationFilterSchema: z.ZodType<Prisma.PlayerListRelationFilter> =
  z
    .object({
      every: z.lazy(() => PlayerWhereInputSchema).optional(),
      some: z.lazy(() => PlayerWhereInputSchema).optional(),
      none: z.lazy(() => PlayerWhereInputSchema).optional(),
    })
    .strict();

export const LeagueListRelationFilterSchema: z.ZodType<Prisma.LeagueListRelationFilter> =
  z
    .object({
      every: z.lazy(() => LeagueWhereInputSchema).optional(),
      some: z.lazy(() => LeagueWhereInputSchema).optional(),
      none: z.lazy(() => LeagueWhereInputSchema).optional(),
    })
    .strict();

export const PlayerOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PlayerOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const LeagueOrderByRelationAggregateInputSchema: z.ZodType<Prisma.LeagueOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const TeamCountOrderByAggregateInputSchema: z.ZodType<Prisma.TeamCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      teamName: z.lazy(() => SortOrderSchema).optional(),
      city: z.lazy(() => SortOrderSchema).optional(),
      since: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const TeamAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TeamAvgOrderByAggregateInput> =
  z
    .object({
      since: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const TeamMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TeamMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      teamName: z.lazy(() => SortOrderSchema).optional(),
      city: z.lazy(() => SortOrderSchema).optional(),
      since: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const TeamMinOrderByAggregateInputSchema: z.ZodType<Prisma.TeamMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      teamName: z.lazy(() => SortOrderSchema).optional(),
      city: z.lazy(() => SortOrderSchema).optional(),
      since: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const TeamSumOrderByAggregateInputSchema: z.ZodType<Prisma.TeamSumOrderByAggregateInput> =
  z
    .object({
      since: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional(),
      in: z.number().array().optional(),
      notIn: z.number().array().optional(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedIntFilterSchema).optional(),
      _max: z.lazy(() => NestedIntFilterSchema).optional(),
    })
    .strict();

export const TeamListRelationFilterSchema: z.ZodType<Prisma.TeamListRelationFilter> =
  z
    .object({
      every: z.lazy(() => TeamWhereInputSchema).optional(),
      some: z.lazy(() => TeamWhereInputSchema).optional(),
      none: z.lazy(() => TeamWhereInputSchema).optional(),
    })
    .strict();

export const TeamOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TeamOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const LeagueCountOrderByAggregateInputSchema: z.ZodType<Prisma.LeagueCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      leagueName: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const LeagueMaxOrderByAggregateInputSchema: z.ZodType<Prisma.LeagueMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      leagueName: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const LeagueMinOrderByAggregateInputSchema: z.ZodType<Prisma.LeagueMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      leagueName: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const TeamCreateNestedOneWithoutPlayersInputSchema: z.ZodType<Prisma.TeamCreateNestedOneWithoutPlayersInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TeamCreateWithoutPlayersInputSchema),
          z.lazy(() => TeamUncheckedCreateWithoutPlayersInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => TeamCreateOrConnectWithoutPlayersInputSchema)
        .optional(),
      connect: z.lazy(() => TeamWhereUniqueInputSchema).optional(),
    })
    .strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> =
  z
    .object({
      set: z.string().optional(),
    })
    .strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> =
  z
    .object({
      set: z.coerce.date().optional().nullable(),
    })
    .strict();

export const NullableEnumPositionFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumPositionFieldUpdateOperationsInput> =
  z
    .object({
      set: z
        .lazy(() => PositionSchema)
        .optional()
        .nullable(),
    })
    .strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> =
  z
    .object({
      set: z.number().optional().nullable(),
      increment: z.number().optional(),
      decrement: z.number().optional(),
      multiply: z.number().optional(),
      divide: z.number().optional(),
    })
    .strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> =
  z
    .object({
      set: z.coerce.date().optional(),
    })
    .strict();

export const TeamUpdateOneWithoutPlayersNestedInputSchema: z.ZodType<Prisma.TeamUpdateOneWithoutPlayersNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TeamCreateWithoutPlayersInputSchema),
          z.lazy(() => TeamUncheckedCreateWithoutPlayersInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => TeamCreateOrConnectWithoutPlayersInputSchema)
        .optional(),
      upsert: z.lazy(() => TeamUpsertWithoutPlayersInputSchema).optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => TeamWhereInputSchema)])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => TeamWhereInputSchema)])
        .optional(),
      connect: z.lazy(() => TeamWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => TeamUpdateToOneWithWhereWithoutPlayersInputSchema),
          z.lazy(() => TeamUpdateWithoutPlayersInputSchema),
          z.lazy(() => TeamUncheckedUpdateWithoutPlayersInputSchema),
        ])
        .optional(),
    })
    .strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> =
  z
    .object({
      set: z.string().optional().nullable(),
    })
    .strict();

export const PlayerCreateNestedManyWithoutTeamInputSchema: z.ZodType<Prisma.PlayerCreateNestedManyWithoutTeamInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => PlayerCreateWithoutTeamInputSchema),
          z.lazy(() => PlayerCreateWithoutTeamInputSchema).array(),
          z.lazy(() => PlayerUncheckedCreateWithoutTeamInputSchema),
          z.lazy(() => PlayerUncheckedCreateWithoutTeamInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => PlayerCreateOrConnectWithoutTeamInputSchema),
          z.lazy(() => PlayerCreateOrConnectWithoutTeamInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => PlayerCreateManyTeamInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => PlayerWhereUniqueInputSchema),
          z.lazy(() => PlayerWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const LeagueCreateNestedManyWithoutTeamsInputSchema: z.ZodType<Prisma.LeagueCreateNestedManyWithoutTeamsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => LeagueCreateWithoutTeamsInputSchema),
          z.lazy(() => LeagueCreateWithoutTeamsInputSchema).array(),
          z.lazy(() => LeagueUncheckedCreateWithoutTeamsInputSchema),
          z.lazy(() => LeagueUncheckedCreateWithoutTeamsInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => LeagueCreateOrConnectWithoutTeamsInputSchema),
          z.lazy(() => LeagueCreateOrConnectWithoutTeamsInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => LeagueWhereUniqueInputSchema),
          z.lazy(() => LeagueWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const PlayerUncheckedCreateNestedManyWithoutTeamInputSchema: z.ZodType<Prisma.PlayerUncheckedCreateNestedManyWithoutTeamInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => PlayerCreateWithoutTeamInputSchema),
          z.lazy(() => PlayerCreateWithoutTeamInputSchema).array(),
          z.lazy(() => PlayerUncheckedCreateWithoutTeamInputSchema),
          z.lazy(() => PlayerUncheckedCreateWithoutTeamInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => PlayerCreateOrConnectWithoutTeamInputSchema),
          z.lazy(() => PlayerCreateOrConnectWithoutTeamInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => PlayerCreateManyTeamInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => PlayerWhereUniqueInputSchema),
          z.lazy(() => PlayerWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const LeagueUncheckedCreateNestedManyWithoutTeamsInputSchema: z.ZodType<Prisma.LeagueUncheckedCreateNestedManyWithoutTeamsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => LeagueCreateWithoutTeamsInputSchema),
          z.lazy(() => LeagueCreateWithoutTeamsInputSchema).array(),
          z.lazy(() => LeagueUncheckedCreateWithoutTeamsInputSchema),
          z.lazy(() => LeagueUncheckedCreateWithoutTeamsInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => LeagueCreateOrConnectWithoutTeamsInputSchema),
          z.lazy(() => LeagueCreateOrConnectWithoutTeamsInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => LeagueWhereUniqueInputSchema),
          z.lazy(() => LeagueWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> =
  z
    .object({
      set: z.number().optional(),
      increment: z.number().optional(),
      decrement: z.number().optional(),
      multiply: z.number().optional(),
      divide: z.number().optional(),
    })
    .strict();

export const PlayerUpdateManyWithoutTeamNestedInputSchema: z.ZodType<Prisma.PlayerUpdateManyWithoutTeamNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => PlayerCreateWithoutTeamInputSchema),
          z.lazy(() => PlayerCreateWithoutTeamInputSchema).array(),
          z.lazy(() => PlayerUncheckedCreateWithoutTeamInputSchema),
          z.lazy(() => PlayerUncheckedCreateWithoutTeamInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => PlayerCreateOrConnectWithoutTeamInputSchema),
          z.lazy(() => PlayerCreateOrConnectWithoutTeamInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => PlayerUpsertWithWhereUniqueWithoutTeamInputSchema),
          z
            .lazy(() => PlayerUpsertWithWhereUniqueWithoutTeamInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => PlayerCreateManyTeamInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => PlayerWhereUniqueInputSchema),
          z.lazy(() => PlayerWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => PlayerWhereUniqueInputSchema),
          z.lazy(() => PlayerWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => PlayerWhereUniqueInputSchema),
          z.lazy(() => PlayerWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => PlayerWhereUniqueInputSchema),
          z.lazy(() => PlayerWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => PlayerUpdateWithWhereUniqueWithoutTeamInputSchema),
          z
            .lazy(() => PlayerUpdateWithWhereUniqueWithoutTeamInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => PlayerUpdateManyWithWhereWithoutTeamInputSchema),
          z.lazy(() => PlayerUpdateManyWithWhereWithoutTeamInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => PlayerScalarWhereInputSchema),
          z.lazy(() => PlayerScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const LeagueUpdateManyWithoutTeamsNestedInputSchema: z.ZodType<Prisma.LeagueUpdateManyWithoutTeamsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => LeagueCreateWithoutTeamsInputSchema),
          z.lazy(() => LeagueCreateWithoutTeamsInputSchema).array(),
          z.lazy(() => LeagueUncheckedCreateWithoutTeamsInputSchema),
          z.lazy(() => LeagueUncheckedCreateWithoutTeamsInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => LeagueCreateOrConnectWithoutTeamsInputSchema),
          z.lazy(() => LeagueCreateOrConnectWithoutTeamsInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => LeagueUpsertWithWhereUniqueWithoutTeamsInputSchema),
          z
            .lazy(() => LeagueUpsertWithWhereUniqueWithoutTeamsInputSchema)
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => LeagueWhereUniqueInputSchema),
          z.lazy(() => LeagueWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => LeagueWhereUniqueInputSchema),
          z.lazy(() => LeagueWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => LeagueWhereUniqueInputSchema),
          z.lazy(() => LeagueWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => LeagueWhereUniqueInputSchema),
          z.lazy(() => LeagueWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => LeagueUpdateWithWhereUniqueWithoutTeamsInputSchema),
          z
            .lazy(() => LeagueUpdateWithWhereUniqueWithoutTeamsInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => LeagueUpdateManyWithWhereWithoutTeamsInputSchema),
          z
            .lazy(() => LeagueUpdateManyWithWhereWithoutTeamsInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => LeagueScalarWhereInputSchema),
          z.lazy(() => LeagueScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const PlayerUncheckedUpdateManyWithoutTeamNestedInputSchema: z.ZodType<Prisma.PlayerUncheckedUpdateManyWithoutTeamNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => PlayerCreateWithoutTeamInputSchema),
          z.lazy(() => PlayerCreateWithoutTeamInputSchema).array(),
          z.lazy(() => PlayerUncheckedCreateWithoutTeamInputSchema),
          z.lazy(() => PlayerUncheckedCreateWithoutTeamInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => PlayerCreateOrConnectWithoutTeamInputSchema),
          z.lazy(() => PlayerCreateOrConnectWithoutTeamInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => PlayerUpsertWithWhereUniqueWithoutTeamInputSchema),
          z
            .lazy(() => PlayerUpsertWithWhereUniqueWithoutTeamInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => PlayerCreateManyTeamInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => PlayerWhereUniqueInputSchema),
          z.lazy(() => PlayerWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => PlayerWhereUniqueInputSchema),
          z.lazy(() => PlayerWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => PlayerWhereUniqueInputSchema),
          z.lazy(() => PlayerWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => PlayerWhereUniqueInputSchema),
          z.lazy(() => PlayerWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => PlayerUpdateWithWhereUniqueWithoutTeamInputSchema),
          z
            .lazy(() => PlayerUpdateWithWhereUniqueWithoutTeamInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => PlayerUpdateManyWithWhereWithoutTeamInputSchema),
          z.lazy(() => PlayerUpdateManyWithWhereWithoutTeamInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => PlayerScalarWhereInputSchema),
          z.lazy(() => PlayerScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const LeagueUncheckedUpdateManyWithoutTeamsNestedInputSchema: z.ZodType<Prisma.LeagueUncheckedUpdateManyWithoutTeamsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => LeagueCreateWithoutTeamsInputSchema),
          z.lazy(() => LeagueCreateWithoutTeamsInputSchema).array(),
          z.lazy(() => LeagueUncheckedCreateWithoutTeamsInputSchema),
          z.lazy(() => LeagueUncheckedCreateWithoutTeamsInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => LeagueCreateOrConnectWithoutTeamsInputSchema),
          z.lazy(() => LeagueCreateOrConnectWithoutTeamsInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => LeagueUpsertWithWhereUniqueWithoutTeamsInputSchema),
          z
            .lazy(() => LeagueUpsertWithWhereUniqueWithoutTeamsInputSchema)
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => LeagueWhereUniqueInputSchema),
          z.lazy(() => LeagueWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => LeagueWhereUniqueInputSchema),
          z.lazy(() => LeagueWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => LeagueWhereUniqueInputSchema),
          z.lazy(() => LeagueWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => LeagueWhereUniqueInputSchema),
          z.lazy(() => LeagueWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => LeagueUpdateWithWhereUniqueWithoutTeamsInputSchema),
          z
            .lazy(() => LeagueUpdateWithWhereUniqueWithoutTeamsInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => LeagueUpdateManyWithWhereWithoutTeamsInputSchema),
          z
            .lazy(() => LeagueUpdateManyWithWhereWithoutTeamsInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => LeagueScalarWhereInputSchema),
          z.lazy(() => LeagueScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TeamCreateNestedManyWithoutLeaguesInputSchema: z.ZodType<Prisma.TeamCreateNestedManyWithoutLeaguesInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TeamCreateWithoutLeaguesInputSchema),
          z.lazy(() => TeamCreateWithoutLeaguesInputSchema).array(),
          z.lazy(() => TeamUncheckedCreateWithoutLeaguesInputSchema),
          z.lazy(() => TeamUncheckedCreateWithoutLeaguesInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TeamCreateOrConnectWithoutLeaguesInputSchema),
          z.lazy(() => TeamCreateOrConnectWithoutLeaguesInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TeamWhereUniqueInputSchema),
          z.lazy(() => TeamWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TeamUncheckedCreateNestedManyWithoutLeaguesInputSchema: z.ZodType<Prisma.TeamUncheckedCreateNestedManyWithoutLeaguesInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TeamCreateWithoutLeaguesInputSchema),
          z.lazy(() => TeamCreateWithoutLeaguesInputSchema).array(),
          z.lazy(() => TeamUncheckedCreateWithoutLeaguesInputSchema),
          z.lazy(() => TeamUncheckedCreateWithoutLeaguesInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TeamCreateOrConnectWithoutLeaguesInputSchema),
          z.lazy(() => TeamCreateOrConnectWithoutLeaguesInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TeamWhereUniqueInputSchema),
          z.lazy(() => TeamWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TeamUpdateManyWithoutLeaguesNestedInputSchema: z.ZodType<Prisma.TeamUpdateManyWithoutLeaguesNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TeamCreateWithoutLeaguesInputSchema),
          z.lazy(() => TeamCreateWithoutLeaguesInputSchema).array(),
          z.lazy(() => TeamUncheckedCreateWithoutLeaguesInputSchema),
          z.lazy(() => TeamUncheckedCreateWithoutLeaguesInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TeamCreateOrConnectWithoutLeaguesInputSchema),
          z.lazy(() => TeamCreateOrConnectWithoutLeaguesInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => TeamUpsertWithWhereUniqueWithoutLeaguesInputSchema),
          z
            .lazy(() => TeamUpsertWithWhereUniqueWithoutLeaguesInputSchema)
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => TeamWhereUniqueInputSchema),
          z.lazy(() => TeamWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => TeamWhereUniqueInputSchema),
          z.lazy(() => TeamWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => TeamWhereUniqueInputSchema),
          z.lazy(() => TeamWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TeamWhereUniqueInputSchema),
          z.lazy(() => TeamWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => TeamUpdateWithWhereUniqueWithoutLeaguesInputSchema),
          z
            .lazy(() => TeamUpdateWithWhereUniqueWithoutLeaguesInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => TeamUpdateManyWithWhereWithoutLeaguesInputSchema),
          z
            .lazy(() => TeamUpdateManyWithWhereWithoutLeaguesInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => TeamScalarWhereInputSchema),
          z.lazy(() => TeamScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TeamUncheckedUpdateManyWithoutLeaguesNestedInputSchema: z.ZodType<Prisma.TeamUncheckedUpdateManyWithoutLeaguesNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TeamCreateWithoutLeaguesInputSchema),
          z.lazy(() => TeamCreateWithoutLeaguesInputSchema).array(),
          z.lazy(() => TeamUncheckedCreateWithoutLeaguesInputSchema),
          z.lazy(() => TeamUncheckedCreateWithoutLeaguesInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TeamCreateOrConnectWithoutLeaguesInputSchema),
          z.lazy(() => TeamCreateOrConnectWithoutLeaguesInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => TeamUpsertWithWhereUniqueWithoutLeaguesInputSchema),
          z
            .lazy(() => TeamUpsertWithWhereUniqueWithoutLeaguesInputSchema)
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => TeamWhereUniqueInputSchema),
          z.lazy(() => TeamWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => TeamWhereUniqueInputSchema),
          z.lazy(() => TeamWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => TeamWhereUniqueInputSchema),
          z.lazy(() => TeamWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TeamWhereUniqueInputSchema),
          z.lazy(() => TeamWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => TeamUpdateWithWhereUniqueWithoutLeaguesInputSchema),
          z
            .lazy(() => TeamUpdateWithWhereUniqueWithoutLeaguesInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => TeamUpdateManyWithWhereWithoutLeaguesInputSchema),
          z
            .lazy(() => TeamUpdateManyWithWhereWithoutLeaguesInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => TeamScalarWhereInputSchema),
          z.lazy(() => TeamScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
      .optional(),
  })
  .strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> =
  z
    .object({
      equals: z.coerce.date().optional().nullable(),
      in: z.coerce.date().array().optional().nullable(),
      notIn: z.coerce.date().array().optional().nullable(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeNullableFilterSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedEnumPositionNullableFilterSchema: z.ZodType<Prisma.NestedEnumPositionNullableFilter> =
  z
    .object({
      equals: z
        .lazy(() => PositionSchema)
        .optional()
        .nullable(),
      in: z
        .lazy(() => PositionSchema)
        .array()
        .optional()
        .nullable(),
      notIn: z
        .lazy(() => PositionSchema)
        .array()
        .optional()
        .nullable(),
      not: z
        .union([
          z.lazy(() => PositionSchema),
          z.lazy(() => NestedEnumPositionNullableFilterSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> =
  z
    .object({
      equals: z.coerce.date().optional(),
      in: z.coerce.date().array().optional(),
      notIn: z.coerce.date().array().optional(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
        .optional(),
    })
    .strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional(),
      in: z.string().array().optional(),
      notIn: z.string().array().optional(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedStringFilterSchema).optional(),
      _max: z.lazy(() => NestedStringFilterSchema).optional(),
    })
    .strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
  })
  .strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.coerce.date().optional().nullable(),
      in: z.coerce.date().array().optional().nullable(),
      notIn: z.coerce.date().array().optional().nullable(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
    })
    .strict();

export const NestedEnumPositionNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumPositionNullableWithAggregatesFilter> =
  z
    .object({
      equals: z
        .lazy(() => PositionSchema)
        .optional()
        .nullable(),
      in: z
        .lazy(() => PositionSchema)
        .array()
        .optional()
        .nullable(),
      notIn: z
        .lazy(() => PositionSchema)
        .array()
        .optional()
        .nullable(),
      not: z
        .union([
          z.lazy(() => PositionSchema),
          z.lazy(() => NestedEnumPositionNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumPositionNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumPositionNullableFilterSchema).optional(),
    })
    .strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([
          z.number(),
          z.lazy(() => NestedIntNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    })
    .strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedFloatNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    })
    .strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> =
  z
    .object({
      equals: z.coerce.date().optional(),
      in: z.coerce.date().array().optional(),
      notIn: z.coerce.date().array().optional(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    })
    .strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional(),
      in: z.number().array().optional(),
      notIn: z.number().array().optional(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedIntFilterSchema).optional(),
      _max: z.lazy(() => NestedIntFilterSchema).optional(),
    })
    .strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedFloatFilterSchema)])
      .optional(),
  })
  .strict();

export const TeamCreateWithoutPlayersInputSchema: z.ZodType<Prisma.TeamCreateWithoutPlayersInput> =
  z
    .object({
      id: z.string().optional(),
      teamName: z.string(),
      city: z.string(),
      since: z.number().int(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      leagues: z
        .lazy(() => LeagueCreateNestedManyWithoutTeamsInputSchema)
        .optional(),
    })
    .strict();

export const TeamUncheckedCreateWithoutPlayersInputSchema: z.ZodType<Prisma.TeamUncheckedCreateWithoutPlayersInput> =
  z
    .object({
      id: z.string().optional(),
      teamName: z.string(),
      city: z.string(),
      since: z.number().int(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      leagues: z
        .lazy(() => LeagueUncheckedCreateNestedManyWithoutTeamsInputSchema)
        .optional(),
    })
    .strict();

export const TeamCreateOrConnectWithoutPlayersInputSchema: z.ZodType<Prisma.TeamCreateOrConnectWithoutPlayersInput> =
  z
    .object({
      where: z.lazy(() => TeamWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => TeamCreateWithoutPlayersInputSchema),
        z.lazy(() => TeamUncheckedCreateWithoutPlayersInputSchema),
      ]),
    })
    .strict();

export const TeamUpsertWithoutPlayersInputSchema: z.ZodType<Prisma.TeamUpsertWithoutPlayersInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => TeamUpdateWithoutPlayersInputSchema),
        z.lazy(() => TeamUncheckedUpdateWithoutPlayersInputSchema),
      ]),
      create: z.union([
        z.lazy(() => TeamCreateWithoutPlayersInputSchema),
        z.lazy(() => TeamUncheckedCreateWithoutPlayersInputSchema),
      ]),
      where: z.lazy(() => TeamWhereInputSchema).optional(),
    })
    .strict();

export const TeamUpdateToOneWithWhereWithoutPlayersInputSchema: z.ZodType<Prisma.TeamUpdateToOneWithWhereWithoutPlayersInput> =
  z
    .object({
      where: z.lazy(() => TeamWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => TeamUpdateWithoutPlayersInputSchema),
        z.lazy(() => TeamUncheckedUpdateWithoutPlayersInputSchema),
      ]),
    })
    .strict();

export const TeamUpdateWithoutPlayersInputSchema: z.ZodType<Prisma.TeamUpdateWithoutPlayersInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      teamName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      city: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      since: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      leagues: z
        .lazy(() => LeagueUpdateManyWithoutTeamsNestedInputSchema)
        .optional(),
    })
    .strict();

export const TeamUncheckedUpdateWithoutPlayersInputSchema: z.ZodType<Prisma.TeamUncheckedUpdateWithoutPlayersInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      teamName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      city: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      since: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      leagues: z
        .lazy(() => LeagueUncheckedUpdateManyWithoutTeamsNestedInputSchema)
        .optional(),
    })
    .strict();

export const PlayerCreateWithoutTeamInputSchema: z.ZodType<Prisma.PlayerCreateWithoutTeamInput> =
  z
    .object({
      id: z.string().optional(),
      firstName: z.string(),
      lastName: z.string(),
      dateBirth: z.coerce.date().optional().nullable(),
      position: z
        .lazy(() => PositionSchema)
        .optional()
        .nullable(),
      playerNumber: z.number().int().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const PlayerUncheckedCreateWithoutTeamInputSchema: z.ZodType<Prisma.PlayerUncheckedCreateWithoutTeamInput> =
  z
    .object({
      id: z.string().optional(),
      firstName: z.string(),
      lastName: z.string(),
      dateBirth: z.coerce.date().optional().nullable(),
      position: z
        .lazy(() => PositionSchema)
        .optional()
        .nullable(),
      playerNumber: z.number().int().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const PlayerCreateOrConnectWithoutTeamInputSchema: z.ZodType<Prisma.PlayerCreateOrConnectWithoutTeamInput> =
  z
    .object({
      where: z.lazy(() => PlayerWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => PlayerCreateWithoutTeamInputSchema),
        z.lazy(() => PlayerUncheckedCreateWithoutTeamInputSchema),
      ]),
    })
    .strict();

export const PlayerCreateManyTeamInputEnvelopeSchema: z.ZodType<Prisma.PlayerCreateManyTeamInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => PlayerCreateManyTeamInputSchema),
        z.lazy(() => PlayerCreateManyTeamInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const LeagueCreateWithoutTeamsInputSchema: z.ZodType<Prisma.LeagueCreateWithoutTeamsInput> =
  z
    .object({
      id: z.string().optional(),
      leagueName: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const LeagueUncheckedCreateWithoutTeamsInputSchema: z.ZodType<Prisma.LeagueUncheckedCreateWithoutTeamsInput> =
  z
    .object({
      id: z.string().optional(),
      leagueName: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const LeagueCreateOrConnectWithoutTeamsInputSchema: z.ZodType<Prisma.LeagueCreateOrConnectWithoutTeamsInput> =
  z
    .object({
      where: z.lazy(() => LeagueWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => LeagueCreateWithoutTeamsInputSchema),
        z.lazy(() => LeagueUncheckedCreateWithoutTeamsInputSchema),
      ]),
    })
    .strict();

export const PlayerUpsertWithWhereUniqueWithoutTeamInputSchema: z.ZodType<Prisma.PlayerUpsertWithWhereUniqueWithoutTeamInput> =
  z
    .object({
      where: z.lazy(() => PlayerWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => PlayerUpdateWithoutTeamInputSchema),
        z.lazy(() => PlayerUncheckedUpdateWithoutTeamInputSchema),
      ]),
      create: z.union([
        z.lazy(() => PlayerCreateWithoutTeamInputSchema),
        z.lazy(() => PlayerUncheckedCreateWithoutTeamInputSchema),
      ]),
    })
    .strict();

export const PlayerUpdateWithWhereUniqueWithoutTeamInputSchema: z.ZodType<Prisma.PlayerUpdateWithWhereUniqueWithoutTeamInput> =
  z
    .object({
      where: z.lazy(() => PlayerWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => PlayerUpdateWithoutTeamInputSchema),
        z.lazy(() => PlayerUncheckedUpdateWithoutTeamInputSchema),
      ]),
    })
    .strict();

export const PlayerUpdateManyWithWhereWithoutTeamInputSchema: z.ZodType<Prisma.PlayerUpdateManyWithWhereWithoutTeamInput> =
  z
    .object({
      where: z.lazy(() => PlayerScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => PlayerUpdateManyMutationInputSchema),
        z.lazy(() => PlayerUncheckedUpdateManyWithoutTeamInputSchema),
      ]),
    })
    .strict();

export const PlayerScalarWhereInputSchema: z.ZodType<Prisma.PlayerScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => PlayerScalarWhereInputSchema),
          z.lazy(() => PlayerScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => PlayerScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => PlayerScalarWhereInputSchema),
          z.lazy(() => PlayerScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      firstName: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      lastName: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      dateBirth: z
        .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
      position: z
        .union([
          z.lazy(() => EnumPositionNullableFilterSchema),
          z.lazy(() => PositionSchema),
        ])
        .optional()
        .nullable(),
      playerNumber: z
        .union([z.lazy(() => IntNullableFilterSchema), z.number()])
        .optional()
        .nullable(),
      teamId: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      createdAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      updatedAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
    })
    .strict();

export const LeagueUpsertWithWhereUniqueWithoutTeamsInputSchema: z.ZodType<Prisma.LeagueUpsertWithWhereUniqueWithoutTeamsInput> =
  z
    .object({
      where: z.lazy(() => LeagueWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => LeagueUpdateWithoutTeamsInputSchema),
        z.lazy(() => LeagueUncheckedUpdateWithoutTeamsInputSchema),
      ]),
      create: z.union([
        z.lazy(() => LeagueCreateWithoutTeamsInputSchema),
        z.lazy(() => LeagueUncheckedCreateWithoutTeamsInputSchema),
      ]),
    })
    .strict();

export const LeagueUpdateWithWhereUniqueWithoutTeamsInputSchema: z.ZodType<Prisma.LeagueUpdateWithWhereUniqueWithoutTeamsInput> =
  z
    .object({
      where: z.lazy(() => LeagueWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => LeagueUpdateWithoutTeamsInputSchema),
        z.lazy(() => LeagueUncheckedUpdateWithoutTeamsInputSchema),
      ]),
    })
    .strict();

export const LeagueUpdateManyWithWhereWithoutTeamsInputSchema: z.ZodType<Prisma.LeagueUpdateManyWithWhereWithoutTeamsInput> =
  z
    .object({
      where: z.lazy(() => LeagueScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => LeagueUpdateManyMutationInputSchema),
        z.lazy(() => LeagueUncheckedUpdateManyWithoutTeamsInputSchema),
      ]),
    })
    .strict();

export const LeagueScalarWhereInputSchema: z.ZodType<Prisma.LeagueScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => LeagueScalarWhereInputSchema),
          z.lazy(() => LeagueScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => LeagueScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => LeagueScalarWhereInputSchema),
          z.lazy(() => LeagueScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      leagueName: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      createdAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      updatedAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
    })
    .strict();

export const TeamCreateWithoutLeaguesInputSchema: z.ZodType<Prisma.TeamCreateWithoutLeaguesInput> =
  z
    .object({
      id: z.string().optional(),
      teamName: z.string(),
      city: z.string(),
      since: z.number().int(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      players: z
        .lazy(() => PlayerCreateNestedManyWithoutTeamInputSchema)
        .optional(),
    })
    .strict();

export const TeamUncheckedCreateWithoutLeaguesInputSchema: z.ZodType<Prisma.TeamUncheckedCreateWithoutLeaguesInput> =
  z
    .object({
      id: z.string().optional(),
      teamName: z.string(),
      city: z.string(),
      since: z.number().int(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      players: z
        .lazy(() => PlayerUncheckedCreateNestedManyWithoutTeamInputSchema)
        .optional(),
    })
    .strict();

export const TeamCreateOrConnectWithoutLeaguesInputSchema: z.ZodType<Prisma.TeamCreateOrConnectWithoutLeaguesInput> =
  z
    .object({
      where: z.lazy(() => TeamWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => TeamCreateWithoutLeaguesInputSchema),
        z.lazy(() => TeamUncheckedCreateWithoutLeaguesInputSchema),
      ]),
    })
    .strict();

export const TeamUpsertWithWhereUniqueWithoutLeaguesInputSchema: z.ZodType<Prisma.TeamUpsertWithWhereUniqueWithoutLeaguesInput> =
  z
    .object({
      where: z.lazy(() => TeamWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => TeamUpdateWithoutLeaguesInputSchema),
        z.lazy(() => TeamUncheckedUpdateWithoutLeaguesInputSchema),
      ]),
      create: z.union([
        z.lazy(() => TeamCreateWithoutLeaguesInputSchema),
        z.lazy(() => TeamUncheckedCreateWithoutLeaguesInputSchema),
      ]),
    })
    .strict();

export const TeamUpdateWithWhereUniqueWithoutLeaguesInputSchema: z.ZodType<Prisma.TeamUpdateWithWhereUniqueWithoutLeaguesInput> =
  z
    .object({
      where: z.lazy(() => TeamWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => TeamUpdateWithoutLeaguesInputSchema),
        z.lazy(() => TeamUncheckedUpdateWithoutLeaguesInputSchema),
      ]),
    })
    .strict();

export const TeamUpdateManyWithWhereWithoutLeaguesInputSchema: z.ZodType<Prisma.TeamUpdateManyWithWhereWithoutLeaguesInput> =
  z
    .object({
      where: z.lazy(() => TeamScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => TeamUpdateManyMutationInputSchema),
        z.lazy(() => TeamUncheckedUpdateManyWithoutLeaguesInputSchema),
      ]),
    })
    .strict();

export const TeamScalarWhereInputSchema: z.ZodType<Prisma.TeamScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => TeamScalarWhereInputSchema),
          z.lazy(() => TeamScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => TeamScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => TeamScalarWhereInputSchema),
          z.lazy(() => TeamScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      teamName: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      city: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      since: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      createdAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      updatedAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
    })
    .strict();

export const PlayerCreateManyTeamInputSchema: z.ZodType<Prisma.PlayerCreateManyTeamInput> =
  z
    .object({
      id: z.string().optional(),
      firstName: z.string(),
      lastName: z.string(),
      dateBirth: z.coerce.date().optional().nullable(),
      position: z
        .lazy(() => PositionSchema)
        .optional()
        .nullable(),
      playerNumber: z.number().int().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const PlayerUpdateWithoutTeamInputSchema: z.ZodType<Prisma.PlayerUpdateWithoutTeamInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      firstName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      lastName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      dateBirth: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      position: z
        .union([
          z.lazy(() => PositionSchema),
          z.lazy(() => NullableEnumPositionFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      playerNumber: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const PlayerUncheckedUpdateWithoutTeamInputSchema: z.ZodType<Prisma.PlayerUncheckedUpdateWithoutTeamInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      firstName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      lastName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      dateBirth: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      position: z
        .union([
          z.lazy(() => PositionSchema),
          z.lazy(() => NullableEnumPositionFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      playerNumber: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const PlayerUncheckedUpdateManyWithoutTeamInputSchema: z.ZodType<Prisma.PlayerUncheckedUpdateManyWithoutTeamInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      firstName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      lastName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      dateBirth: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      position: z
        .union([
          z.lazy(() => PositionSchema),
          z.lazy(() => NullableEnumPositionFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      playerNumber: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const LeagueUpdateWithoutTeamsInputSchema: z.ZodType<Prisma.LeagueUpdateWithoutTeamsInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      leagueName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const LeagueUncheckedUpdateWithoutTeamsInputSchema: z.ZodType<Prisma.LeagueUncheckedUpdateWithoutTeamsInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      leagueName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const LeagueUncheckedUpdateManyWithoutTeamsInputSchema: z.ZodType<Prisma.LeagueUncheckedUpdateManyWithoutTeamsInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      leagueName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TeamUpdateWithoutLeaguesInputSchema: z.ZodType<Prisma.TeamUpdateWithoutLeaguesInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      teamName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      city: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      since: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      players: z
        .lazy(() => PlayerUpdateManyWithoutTeamNestedInputSchema)
        .optional(),
    })
    .strict();

export const TeamUncheckedUpdateWithoutLeaguesInputSchema: z.ZodType<Prisma.TeamUncheckedUpdateWithoutLeaguesInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      teamName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      city: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      since: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      players: z
        .lazy(() => PlayerUncheckedUpdateManyWithoutTeamNestedInputSchema)
        .optional(),
    })
    .strict();

export const TeamUncheckedUpdateManyWithoutLeaguesInputSchema: z.ZodType<Prisma.TeamUncheckedUpdateManyWithoutLeaguesInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      teamName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      city: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      since: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const PlayerFindFirstArgsSchema: z.ZodType<Prisma.PlayerFindFirstArgs> =
  z
    .object({
      select: PlayerSelectSchema.optional(),
      include: PlayerIncludeSchema.optional(),
      where: PlayerWhereInputSchema.optional(),
      orderBy: z
        .union([
          PlayerOrderByWithRelationInputSchema.array(),
          PlayerOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: PlayerWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          PlayerScalarFieldEnumSchema,
          PlayerScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const PlayerFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PlayerFindFirstOrThrowArgs> =
  z
    .object({
      select: PlayerSelectSchema.optional(),
      include: PlayerIncludeSchema.optional(),
      where: PlayerWhereInputSchema.optional(),
      orderBy: z
        .union([
          PlayerOrderByWithRelationInputSchema.array(),
          PlayerOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: PlayerWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          PlayerScalarFieldEnumSchema,
          PlayerScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const PlayerFindManyArgsSchema: z.ZodType<Prisma.PlayerFindManyArgs> = z
  .object({
    select: PlayerSelectSchema.optional(),
    include: PlayerIncludeSchema.optional(),
    where: PlayerWhereInputSchema.optional(),
    orderBy: z
      .union([
        PlayerOrderByWithRelationInputSchema.array(),
        PlayerOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: PlayerWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([PlayerScalarFieldEnumSchema, PlayerScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const PlayerAggregateArgsSchema: z.ZodType<Prisma.PlayerAggregateArgs> =
  z
    .object({
      where: PlayerWhereInputSchema.optional(),
      orderBy: z
        .union([
          PlayerOrderByWithRelationInputSchema.array(),
          PlayerOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: PlayerWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const PlayerGroupByArgsSchema: z.ZodType<Prisma.PlayerGroupByArgs> = z
  .object({
    where: PlayerWhereInputSchema.optional(),
    orderBy: z
      .union([
        PlayerOrderByWithAggregationInputSchema.array(),
        PlayerOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: PlayerScalarFieldEnumSchema.array(),
    having: PlayerScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const PlayerFindUniqueArgsSchema: z.ZodType<Prisma.PlayerFindUniqueArgs> =
  z
    .object({
      select: PlayerSelectSchema.optional(),
      include: PlayerIncludeSchema.optional(),
      where: PlayerWhereUniqueInputSchema,
    })
    .strict();

export const PlayerFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PlayerFindUniqueOrThrowArgs> =
  z
    .object({
      select: PlayerSelectSchema.optional(),
      include: PlayerIncludeSchema.optional(),
      where: PlayerWhereUniqueInputSchema,
    })
    .strict();

export const TeamFindFirstArgsSchema: z.ZodType<Prisma.TeamFindFirstArgs> = z
  .object({
    select: TeamSelectSchema.optional(),
    include: TeamIncludeSchema.optional(),
    where: TeamWhereInputSchema.optional(),
    orderBy: z
      .union([
        TeamOrderByWithRelationInputSchema.array(),
        TeamOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: TeamWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([TeamScalarFieldEnumSchema, TeamScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const TeamFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TeamFindFirstOrThrowArgs> =
  z
    .object({
      select: TeamSelectSchema.optional(),
      include: TeamIncludeSchema.optional(),
      where: TeamWhereInputSchema.optional(),
      orderBy: z
        .union([
          TeamOrderByWithRelationInputSchema.array(),
          TeamOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: TeamWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([TeamScalarFieldEnumSchema, TeamScalarFieldEnumSchema.array()])
        .optional(),
    })
    .strict();

export const TeamFindManyArgsSchema: z.ZodType<Prisma.TeamFindManyArgs> = z
  .object({
    select: TeamSelectSchema.optional(),
    include: TeamIncludeSchema.optional(),
    where: TeamWhereInputSchema.optional(),
    orderBy: z
      .union([
        TeamOrderByWithRelationInputSchema.array(),
        TeamOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: TeamWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([TeamScalarFieldEnumSchema, TeamScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const TeamAggregateArgsSchema: z.ZodType<Prisma.TeamAggregateArgs> = z
  .object({
    where: TeamWhereInputSchema.optional(),
    orderBy: z
      .union([
        TeamOrderByWithRelationInputSchema.array(),
        TeamOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: TeamWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const TeamGroupByArgsSchema: z.ZodType<Prisma.TeamGroupByArgs> = z
  .object({
    where: TeamWhereInputSchema.optional(),
    orderBy: z
      .union([
        TeamOrderByWithAggregationInputSchema.array(),
        TeamOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: TeamScalarFieldEnumSchema.array(),
    having: TeamScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const TeamFindUniqueArgsSchema: z.ZodType<Prisma.TeamFindUniqueArgs> = z
  .object({
    select: TeamSelectSchema.optional(),
    include: TeamIncludeSchema.optional(),
    where: TeamWhereUniqueInputSchema,
  })
  .strict();

export const TeamFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TeamFindUniqueOrThrowArgs> =
  z
    .object({
      select: TeamSelectSchema.optional(),
      include: TeamIncludeSchema.optional(),
      where: TeamWhereUniqueInputSchema,
    })
    .strict();

export const LeagueFindFirstArgsSchema: z.ZodType<Prisma.LeagueFindFirstArgs> =
  z
    .object({
      select: LeagueSelectSchema.optional(),
      include: LeagueIncludeSchema.optional(),
      where: LeagueWhereInputSchema.optional(),
      orderBy: z
        .union([
          LeagueOrderByWithRelationInputSchema.array(),
          LeagueOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: LeagueWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          LeagueScalarFieldEnumSchema,
          LeagueScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const LeagueFindFirstOrThrowArgsSchema: z.ZodType<Prisma.LeagueFindFirstOrThrowArgs> =
  z
    .object({
      select: LeagueSelectSchema.optional(),
      include: LeagueIncludeSchema.optional(),
      where: LeagueWhereInputSchema.optional(),
      orderBy: z
        .union([
          LeagueOrderByWithRelationInputSchema.array(),
          LeagueOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: LeagueWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          LeagueScalarFieldEnumSchema,
          LeagueScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const LeagueFindManyArgsSchema: z.ZodType<Prisma.LeagueFindManyArgs> = z
  .object({
    select: LeagueSelectSchema.optional(),
    include: LeagueIncludeSchema.optional(),
    where: LeagueWhereInputSchema.optional(),
    orderBy: z
      .union([
        LeagueOrderByWithRelationInputSchema.array(),
        LeagueOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: LeagueWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([LeagueScalarFieldEnumSchema, LeagueScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const LeagueAggregateArgsSchema: z.ZodType<Prisma.LeagueAggregateArgs> =
  z
    .object({
      where: LeagueWhereInputSchema.optional(),
      orderBy: z
        .union([
          LeagueOrderByWithRelationInputSchema.array(),
          LeagueOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: LeagueWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const LeagueGroupByArgsSchema: z.ZodType<Prisma.LeagueGroupByArgs> = z
  .object({
    where: LeagueWhereInputSchema.optional(),
    orderBy: z
      .union([
        LeagueOrderByWithAggregationInputSchema.array(),
        LeagueOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: LeagueScalarFieldEnumSchema.array(),
    having: LeagueScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const LeagueFindUniqueArgsSchema: z.ZodType<Prisma.LeagueFindUniqueArgs> =
  z
    .object({
      select: LeagueSelectSchema.optional(),
      include: LeagueIncludeSchema.optional(),
      where: LeagueWhereUniqueInputSchema,
    })
    .strict();

export const LeagueFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.LeagueFindUniqueOrThrowArgs> =
  z
    .object({
      select: LeagueSelectSchema.optional(),
      include: LeagueIncludeSchema.optional(),
      where: LeagueWhereUniqueInputSchema,
    })
    .strict();

export const PlayerCreateArgsSchema: z.ZodType<Prisma.PlayerCreateArgs> = z
  .object({
    select: PlayerSelectSchema.optional(),
    include: PlayerIncludeSchema.optional(),
    data: z.union([PlayerCreateInputSchema, PlayerUncheckedCreateInputSchema]),
  })
  .strict();

export const PlayerUpsertArgsSchema: z.ZodType<Prisma.PlayerUpsertArgs> = z
  .object({
    select: PlayerSelectSchema.optional(),
    include: PlayerIncludeSchema.optional(),
    where: PlayerWhereUniqueInputSchema,
    create: z.union([
      PlayerCreateInputSchema,
      PlayerUncheckedCreateInputSchema,
    ]),
    update: z.union([
      PlayerUpdateInputSchema,
      PlayerUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export const PlayerCreateManyArgsSchema: z.ZodType<Prisma.PlayerCreateManyArgs> =
  z
    .object({
      data: z.union([
        PlayerCreateManyInputSchema,
        PlayerCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const PlayerDeleteArgsSchema: z.ZodType<Prisma.PlayerDeleteArgs> = z
  .object({
    select: PlayerSelectSchema.optional(),
    include: PlayerIncludeSchema.optional(),
    where: PlayerWhereUniqueInputSchema,
  })
  .strict();

export const PlayerUpdateArgsSchema: z.ZodType<Prisma.PlayerUpdateArgs> = z
  .object({
    select: PlayerSelectSchema.optional(),
    include: PlayerIncludeSchema.optional(),
    data: z.union([PlayerUpdateInputSchema, PlayerUncheckedUpdateInputSchema]),
    where: PlayerWhereUniqueInputSchema,
  })
  .strict();

export const PlayerUpdateManyArgsSchema: z.ZodType<Prisma.PlayerUpdateManyArgs> =
  z
    .object({
      data: z.union([
        PlayerUpdateManyMutationInputSchema,
        PlayerUncheckedUpdateManyInputSchema,
      ]),
      where: PlayerWhereInputSchema.optional(),
    })
    .strict();

export const PlayerDeleteManyArgsSchema: z.ZodType<Prisma.PlayerDeleteManyArgs> =
  z
    .object({
      where: PlayerWhereInputSchema.optional(),
    })
    .strict();

export const TeamCreateArgsSchema: z.ZodType<Prisma.TeamCreateArgs> = z
  .object({
    select: TeamSelectSchema.optional(),
    include: TeamIncludeSchema.optional(),
    data: z.union([TeamCreateInputSchema, TeamUncheckedCreateInputSchema]),
  })
  .strict();

export const TeamUpsertArgsSchema: z.ZodType<Prisma.TeamUpsertArgs> = z
  .object({
    select: TeamSelectSchema.optional(),
    include: TeamIncludeSchema.optional(),
    where: TeamWhereUniqueInputSchema,
    create: z.union([TeamCreateInputSchema, TeamUncheckedCreateInputSchema]),
    update: z.union([TeamUpdateInputSchema, TeamUncheckedUpdateInputSchema]),
  })
  .strict();

export const TeamCreateManyArgsSchema: z.ZodType<Prisma.TeamCreateManyArgs> = z
  .object({
    data: z.union([
      TeamCreateManyInputSchema,
      TeamCreateManyInputSchema.array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const TeamDeleteArgsSchema: z.ZodType<Prisma.TeamDeleteArgs> = z
  .object({
    select: TeamSelectSchema.optional(),
    include: TeamIncludeSchema.optional(),
    where: TeamWhereUniqueInputSchema,
  })
  .strict();

export const TeamUpdateArgsSchema: z.ZodType<Prisma.TeamUpdateArgs> = z
  .object({
    select: TeamSelectSchema.optional(),
    include: TeamIncludeSchema.optional(),
    data: z.union([TeamUpdateInputSchema, TeamUncheckedUpdateInputSchema]),
    where: TeamWhereUniqueInputSchema,
  })
  .strict();

export const TeamUpdateManyArgsSchema: z.ZodType<Prisma.TeamUpdateManyArgs> = z
  .object({
    data: z.union([
      TeamUpdateManyMutationInputSchema,
      TeamUncheckedUpdateManyInputSchema,
    ]),
    where: TeamWhereInputSchema.optional(),
  })
  .strict();

export const TeamDeleteManyArgsSchema: z.ZodType<Prisma.TeamDeleteManyArgs> = z
  .object({
    where: TeamWhereInputSchema.optional(),
  })
  .strict();

export const LeagueCreateArgsSchema: z.ZodType<Prisma.LeagueCreateArgs> = z
  .object({
    select: LeagueSelectSchema.optional(),
    include: LeagueIncludeSchema.optional(),
    data: z.union([LeagueCreateInputSchema, LeagueUncheckedCreateInputSchema]),
  })
  .strict();

export const LeagueUpsertArgsSchema: z.ZodType<Prisma.LeagueUpsertArgs> = z
  .object({
    select: LeagueSelectSchema.optional(),
    include: LeagueIncludeSchema.optional(),
    where: LeagueWhereUniqueInputSchema,
    create: z.union([
      LeagueCreateInputSchema,
      LeagueUncheckedCreateInputSchema,
    ]),
    update: z.union([
      LeagueUpdateInputSchema,
      LeagueUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export const LeagueCreateManyArgsSchema: z.ZodType<Prisma.LeagueCreateManyArgs> =
  z
    .object({
      data: z.union([
        LeagueCreateManyInputSchema,
        LeagueCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const LeagueDeleteArgsSchema: z.ZodType<Prisma.LeagueDeleteArgs> = z
  .object({
    select: LeagueSelectSchema.optional(),
    include: LeagueIncludeSchema.optional(),
    where: LeagueWhereUniqueInputSchema,
  })
  .strict();

export const LeagueUpdateArgsSchema: z.ZodType<Prisma.LeagueUpdateArgs> = z
  .object({
    select: LeagueSelectSchema.optional(),
    include: LeagueIncludeSchema.optional(),
    data: z.union([LeagueUpdateInputSchema, LeagueUncheckedUpdateInputSchema]),
    where: LeagueWhereUniqueInputSchema,
  })
  .strict();

export const LeagueUpdateManyArgsSchema: z.ZodType<Prisma.LeagueUpdateManyArgs> =
  z
    .object({
      data: z.union([
        LeagueUpdateManyMutationInputSchema,
        LeagueUncheckedUpdateManyInputSchema,
      ]),
      where: LeagueWhereInputSchema.optional(),
    })
    .strict();

export const LeagueDeleteManyArgsSchema: z.ZodType<Prisma.LeagueDeleteManyArgs> =
  z
    .object({
      where: LeagueWhereInputSchema.optional(),
    })
    .strict();

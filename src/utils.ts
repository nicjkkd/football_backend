import { OperationTypes } from "./models";
import { v4 as uuidv4 } from "uuid";

interface Filter {
  lt: Date;
  gt: Date;
}

export const buildBirthDateFilterObj = (
  convertedYoungerThan: Date,
  convertedOlderThan: Date
) => {
  const filterParamsObj = {} as Filter;
  if (convertedYoungerThan) filterParamsObj.lt = convertedYoungerThan;
  if (convertedOlderThan) filterParamsObj.gt = convertedOlderThan;
  return Object.keys(filterParamsObj).length
    ? { dateBirth: filterParamsObj }
    : {};
};

export const isValidDate = (d: unknown): d is Date => {
  return d instanceof Date && !isNaN(d.getTime());
};

export const checkAgeLimitInput = (date: Date): boolean => {
  return date.getFullYear() >= 1000 && date.getFullYear() <= 3000;
};

export const broadcastResponse = (
  data: {
    operation: OperationTypes;
    entity: Array<string>;
    responseEntityObject: Record<string, unknown>;
    id?: string;
  },
  broadcast: (data: string) => void
) => {
  let eventId = uuidv4();

  const broadcastData: Record<string, unknown> = {
    operation: data.operation,
    entity: data.entity,
    data: data.responseEntityObject,
    eventId: eventId,
    ...(data.id ? { id: data.id } : {}),
  };

  broadcast(JSON.stringify(broadcastData));

  return { ...data.responseEntityObject, eventId: eventId };
};

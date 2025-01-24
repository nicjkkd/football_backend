import { sendResponseFunctionProps } from "./models";
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

export const sendResponseWithBroadcast = ({
  response,
  broadcast,
  responsePayload,
}: sendResponseFunctionProps) => {
  const eventId = uuidv4();

  const responseData: Record<string, unknown> = {
    ...responsePayload.data,
    eventId,
  };

  const broadcastData: Record<string, unknown> = {
    ...responsePayload,
    eventId,
  };

  broadcast(JSON.stringify(broadcastData));
  response.json(responseData);
};

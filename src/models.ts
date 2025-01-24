import { Response } from "express";

export interface TeamsWhere {
  teamName: {
    contains: string;
  };
}

export enum OperationTypes {
  invalidate = "invalidate",
  create = "create",
  delete = "delete",
  update = "update",
}

export interface sendResponseFunctionProps {
  response: Response;
  broadcast: (data: string) => void;
  responsePayload: sendResponseFunctionPayloadProp;
}

export interface sendResponseFunctionPayloadProp {
  operation: OperationTypes;
  entity: Array<string>;
  data: Record<string, unknown>;
  id?: string;
}

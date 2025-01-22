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

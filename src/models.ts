export interface TeamsWhere {
  teamName: {
    contains: string;
  };
}

export enum ActionTypes {
  Update = "Update",
  Create = "Create",
  Delete = "Delete",
}

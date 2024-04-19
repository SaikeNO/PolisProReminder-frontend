export enum ActionResultsTypes {
  SUCCESS,
  FAILURE,
}

export interface ActionResults {
  message: string;
  type: ActionResultsTypes;
}

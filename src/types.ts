export type TaskAction = "remove" | "add" | "modify";

export interface Task {
  id: number;
  description: string;
  modifying: boolean,
//   startTime: string;
//   endTime: string;
//   duration: number;
//   isBlocked: bo|olean;
  status: boolean ;
}

export type ModifyingAction = "Submit" | "Modify"
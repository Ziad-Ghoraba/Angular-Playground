import { InjectionToken, Provider } from "@angular/core";

export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE';


type TaskStatusOption = {
  value: string;
  taskStatus: TaskStatus;
  text: string;
}
export const  TASK_STATUS_OPTIONS = new InjectionToken<TaskStatusOption[]>('TASK_STATUS_OPTIONS')

export const TaskStatusOptions: TaskStatusOption []=
[
  {
    value:'open',
    taskStatus: 'OPEN',
    text: 'Open'
  },
  {
    value:'in_progress',
    taskStatus: 'IN_PROGRESS',
    text: 'In Progress'
  },
  {
    value:'done',
    taskStatus: 'DONE',
    text: 'Done'
  }
]
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export const taskStatusOptionProvider : Provider =
{
      provide: TASK_STATUS_OPTIONS,
      useValue: TaskStatusOptions
}

import { inject, Injectable, signal } from "@angular/core";
import { Task, TaskStatus } from "./task.model";
import { LoggingService } from "../logging.service";

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private loggingService = inject(LoggingService);

  private tasks = signal<Task[]>([]);
  allTasks = this.tasks.asReadonly();

  addTask(TaskData: {title: string, description: string}){
     const newTask: Task = {
       ...TaskData,
      id: Math.random().toString(),
      status: 'OPEN'
    };
    this.tasks.update((currentTasks) => [...currentTasks, newTask]);
    this.loggingService.log(`Task added: ${newTask.title}`);
  }

  updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    this.tasks.update((currentTasks) => currentTasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, status: newStatus };
      }
      return task;
    }));
    this.loggingService.log(`Task status updated: ${taskId} to ${newStatus}`);
  }
}

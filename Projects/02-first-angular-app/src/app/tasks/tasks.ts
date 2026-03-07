import { Component ,Input, Output, EventEmitter, inject  } from '@angular/core';
import { Task } from './task/task';
import { NewTask } from './new-task/new-task';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl : './tasks.html',
  styleUrl : './tasks.css',
  imports : [Task, NewTask]
})
export class Tasks {
    @Input({required : true}) name?: string;
    @Input({required : true}) userId!: string;
    isAddingTask = false;
    private tasksService = inject(TasksService);


  get selectedUserTasks() {
    return this.tasksService.getUserTasks(this.userId!);
  }

  onStartAddTask(){
    this.isAddingTask = true;
  }
  onCloseAddTask(){
    this.isAddingTask = false;
  }
}

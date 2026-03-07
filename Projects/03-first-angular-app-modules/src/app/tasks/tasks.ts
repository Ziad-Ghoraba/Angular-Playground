import { Component ,Input, Output, EventEmitter, inject  } from '@angular/core';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: false,
  templateUrl : './tasks.html',
  styleUrl : './tasks.css',
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

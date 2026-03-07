import { Component, Input, Output, EventEmitter } from '@angular/core';
import { type TaskModel } from './task.model';
import { Card } from "../../shared/card/card";
import { DatePipe } from "@angular/common";
import { TasksService } from '../tasks.service';


@Component({
  selector: 'app-task',
  imports: [Card, DatePipe],
  templateUrl: './task.html',
  styleUrl: './task.css',
})
export class Task {
  @Input({required : true}) task!: TaskModel;

   _taskService: TasksService;
  constructor(private tasksService: TasksService) {
    this._taskService = tasksService;
  }

  completedTask() {
    this._taskService.removeTask(this.task.id);
  }
}

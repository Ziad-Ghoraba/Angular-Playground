import { Component, Output, EventEmitter, inject, Input} from '@angular/core';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  standalone: false,
  templateUrl: './new-task.html',
  styleUrl: './new-task.css',
})
export class NewTask {
  @Input({required : true}) userId!: string;
  @Output() close = new EventEmitter<void>();
  enteredTitle = '';
  enteredSummary = '';
  enteredDueDate = '';

  private tasksService = inject(TasksService);

  onClose() {
    this.close.emit();
  }

  onSubmit(){
   this.tasksService.addTask(this.userId, {
    title: this.enteredTitle,
    summary: this.enteredSummary,
    dueDate: this.enteredDueDate
   })
   this.onClose();
  }
}

import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TasksService } from '../tasks.service';
import { CanDeactivateFn, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  userId = input.required<string>();
  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');
  submitted = false;
  private tasksService = inject(TasksService);
  private router = inject(Router);

  onSubmit() {
    this.tasksService.addTask(
      {
        title: this.enteredTitle(),
        summary: this.enteredSummary(),
        date: this.enteredDate(),
      },
      this.userId()
    );
    this.submitted = true;
    this.router.navigate(['/users', this.userId(), 'tasks'],{
      replaceUrl: true, // Replace the current URL in the history stack to prevent going back to the form after submission
    });
  }
}



export const canLeaveEditPage : CanDeactivateFn<NewTaskComponent> = (component) => {
  if ((component.enteredTitle() || component.enteredSummary() || component.enteredDate()) && !component.submitted) {
    return window.confirm('You have unsaved changes. Are you sure you want to leave?');
  }
  return true;
}
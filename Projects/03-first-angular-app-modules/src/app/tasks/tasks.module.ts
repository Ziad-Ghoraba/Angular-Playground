import { NgModule } from "@angular/core";
import { Tasks } from "./tasks";
import { Task } from "./task/task";
import { NewTask } from "./new-task/new-task";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [Tasks, Task, NewTask],
  imports: [FormsModule, SharedModule, CommonModule],
  exports: [Tasks]
})
export class TasksModule {}

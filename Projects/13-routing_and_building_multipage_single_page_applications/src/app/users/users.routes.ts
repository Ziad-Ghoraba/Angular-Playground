import { Route } from "@angular/router";
import { TasksComponent } from "../tasks/tasks.component";
import { NewTaskComponent } from "../tasks/new-task/new-task.component";

export const userRoutes : Route[] =  [
    {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full'
    },
    {
        path: 'tasks', //<your-domain>/users/:userId/tasks
        component: TasksComponent
    },
    {
        path: 'tasks/new', //<your-domain>/users/:userId/tasks/new
        component: NewTaskComponent
    }
]
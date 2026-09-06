import { Route } from "@angular/router";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { userRoutes } from "./users/users.routes";

export const routes : Route[] = [
    {
        path: '', //<your-domain>
        component: NoTaskComponent
    },
    {
        path: 'users/:userId', //<your-domain>/tasks
        component: UserTasksComponent,
        children: userRoutes
    },
    {
        path: '**', //<your-domain>/anything-else
        component: NotFoundComponent
    }
]
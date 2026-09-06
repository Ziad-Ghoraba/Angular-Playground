import { Route } from "@angular/router";
import { resolveUserTasks, TasksComponent } from "../tasks/tasks.component";
import { canLeaveEditPage, NewTaskComponent } from "../tasks/new-task/new-task.component";

export const userRoutes : Route[] =  [
    {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full'
    },
    {
        path: 'tasks', //<your-domain>/users/:userId/tasks
        component: TasksComponent,
        runGuardsAndResolvers: 'always', // This ensures that the resolver is re-run when navigating to the same route with different parameters
        resolve: {
            userTasks: resolveUserTasks
        }
    },
    {
        path: 'tasks/new', //<your-domain>/users/:userId/tasks/new
        canDeactivate: [canLeaveEditPage], // This guard will be checked before deactivating this route
        component: NewTaskComponent
    }
]
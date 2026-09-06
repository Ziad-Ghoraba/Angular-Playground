import { CanMatchFn, RedirectCommand, Route, Router } from "@angular/router";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { resolveTitle, resolveUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { userRoutes } from "./users/users.routes";
import { inject } from "@angular/core";
import { canLeaveEditPage } from "./tasks/new-task/new-task.component";

const dummyCanMathch: CanMatchFn = (route, segments) => {
    const router = inject(Router);
    const shoulGetAccess = Math.random() < 0.5; // Randomly allow or deny access
    if (shoulGetAccess) {
        return shoulGetAccess;
    }
    console.log('Access denied. Redirecting to /unauthorized.');
    return new RedirectCommand(router.parseUrl('/unauthorized')); // Redirect to a specific route if access is denied
};

export const routes : Route[] = [
    {
        path: '', //<your-domain>
        component: NoTaskComponent,
        title: 'No Task'
    },
    {
        path: 'users/:userId', //<your-domain>/tasks
        component: UserTasksComponent,
        children: userRoutes,
        // canMatch: [dummyCanMathch], // This guard will be checked before activating this route and its children
        data: { //static data that can be passed to the component
            message: 'User tasks page' // This data can be accessed in the UserTasksComponent using the ActivatedRoute service.
        },
        resolve: { // dynamic data that can be resolved before the component is loaded
            userName: resolveUserName
        },
        title: resolveTitle
    },
    {
        path: '**', //<your-domain>/anything-else
        component: NotFoundComponent
    }
]
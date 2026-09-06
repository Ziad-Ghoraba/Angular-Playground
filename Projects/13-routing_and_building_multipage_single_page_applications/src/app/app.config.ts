import { ApplicationConfig } from "@angular/core";
import { routes } from "./app.routes";
import { provideRouter, withComponentInputBinding, withRouterConfig } from "@angular/router";

export const appConfig : ApplicationConfig = {
    providers: [
        provideRouter(routes, withComponentInputBinding(), withRouterConfig({
            paramsInheritanceStrategy: 'always', // Allow passing route parameters to child routes as inputs
        }))
    ]
}
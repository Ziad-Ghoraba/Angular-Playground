import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { App } from './app';
import { Header } from './header/header';
import { User } from './user/user';
import { SharedModule } from './shared/shared.module';
import { TasksModule } from './tasks/tasks.module';

// Special Decorator
@NgModule({
  declarations: [App, Header, User],// That array where you will declare and register all the components, directives and pipes that you want to use in your application.
  bootstrap: [App], // That array where you will specify the root component that Angular should bootstrap when it starts the application. In this case, it's the App component.
  imports: [BrowserModule, SharedModule, TasksModule] // That array where you will import other modules that your application needs. In this case, we are importing the Header, User and Task components as they are not standalone components.
})

export class AppModule{

}

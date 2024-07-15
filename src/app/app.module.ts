
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { NewTaskComponent } from './tasks/new-task/new-task.component';
import { HeaderCompoenent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { UserTasksComponent } from './tasks/user-tasks/user-tasks.component';
import { BrowserModule } from '@angular/platform-browser';
import { CardComponent } from './shared/card/card.component';
import { FormsModule } from '@angular/forms';
import { TaskModule } from './tasks/task.module';

@NgModule({
  declarations: [AppComponent,HeaderCompoenent,UserComponent,CardComponent],
  imports:[BrowserModule,FormsModule,TaskModule],// browser module make application to run and also has pipes
  bootstrap: [AppComponent] // root component
})
export class AppModule{}
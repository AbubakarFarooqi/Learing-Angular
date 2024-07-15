import { NgModule } from '@angular/core';
import { NewTaskComponent } from './new-task/new-task.component';
import { UserTasksComponent } from './user-tasks/user-tasks.component';
import { TasksComponent } from './tasks.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [NewTaskComponent,UserTasksComponent,TasksComponent],
    imports: [BrowserModule,FormsModule],
    exports:[NewTaskComponent,UserTasksComponent,TasksComponent]
})

export class TaskModule{}
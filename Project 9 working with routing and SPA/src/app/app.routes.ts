import { Routes } from '@angular/router';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import { TaskComponent } from './tasks/task/task.component';

export const routes: Routes = [
  {
    path: '',
    component: NoTaskComponent,
  },
  {
    path: 'tasks',
    component: TaskComponent,
  },
];

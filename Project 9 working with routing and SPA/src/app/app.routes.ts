import { Routes } from '@angular/router';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import { TaskComponent } from './tasks/task/task.component';
import { UserComponent } from './users/user/user.component';
import { UserTasksComponent } from './users/user-tasks/user-tasks.component';

export const routes: Routes = [
  {
    path: '',
    component: NoTaskComponent,
  },
  // {
  //   path: 'tasks/:userId',
  //   component: TaskComponent,
  // },
  {
    path: 'user/:userId',
    component: UserTasksComponent,
  },
];

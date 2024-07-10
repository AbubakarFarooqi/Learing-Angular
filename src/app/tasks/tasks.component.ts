import { Component,Input } from '@angular/core';
import { DUMMY_USERS } from '../dummy-users';
import { UserTasksComponent } from './user-tasks/user-tasks.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [UserTasksComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  @Input() name?: string
 
}

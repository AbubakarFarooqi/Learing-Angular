import { Component,Input } from '@angular/core';
import { dummyTasks } from './Dummy-Tasks';
import { UserTasksComponent } from './user-tasks/user-tasks.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [UserTasksComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  @Input({required:true}) userId!:string
  @Input({required:true}) name!: string

  tasks = dummyTasks

  get getUserTasks(){
    return this.tasks.filter((task) => task.userId === this.userId)
  }
 
}

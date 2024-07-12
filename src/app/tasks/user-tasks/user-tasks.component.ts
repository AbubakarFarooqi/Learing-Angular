import { Component,EventEmitter,Input, Output } from '@angular/core';
import { type User_Task } from './user-task.model';



@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css'
})
export class UserTasksComponent {

  @Input() task?:User_Task;
  @Output() completeTask = new EventEmitter<string>(); 

  onCompleteTask() {
    this.completeTask.emit(this.task?.id)
  }

}

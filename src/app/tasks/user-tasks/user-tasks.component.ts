import { Component,EventEmitter,Input, Output, inject } from '@angular/core';
import { type User_Task } from './user-task.model';
import { CardComponent } from "../../shared/card/card.component";
import { DatePipe } from '@angular/common';
import { TaskService } from '../tasks.service';


@Component({
  selector: 'app-user-tasks',
  //standalone: true,
  //imports: [CardComponent,DatePipe],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css'
})
export class UserTasksComponent {
  private taskService = inject(TaskService)
  @Input() task?:User_Task;

  onCompleteTask() {
    this.taskService.completeUserTask(this.task!.id)
  }

}

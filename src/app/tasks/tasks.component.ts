import { Component,Input } from '@angular/core';
import { dummyTasks } from './Dummy-Tasks';
import { UserTasksComponent } from './user-tasks/user-tasks.component';
import { NewTaskComponent } from "./new-task/new-task.component";
import { AddTaskModel } from './new-task/add-task.model';
import { TaskService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  //standalone: true,
  //imports: [UserTasksComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {

  //Dependency Injection
  constructor(private taskService:TaskService){}

  @Input({required:true}) userId!:string
  @Input({required:true}) name!: string

  isAddTask = false;


  get getUserTasks(){
    return this.taskService.getUserTasks(this.userId)
  }
  // onCompleteUserTask(id:string) {
  //   this.taskService.completeUserTask(id)
  // }
  onAddTask() {
    this.isAddTask = true
  }
  onClosingDialog(){
    this.isAddTask = false
  }
}

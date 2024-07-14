import { Component,Input } from '@angular/core';
import { dummyTasks } from './Dummy-Tasks';
import { UserTasksComponent } from './user-tasks/user-tasks.component';
import { NewTaskComponent } from "./new-task/new-task.component";
import { AddTaskModel } from './new-task/add-task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [UserTasksComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {



  @Input({required:true}) userId!:string
  @Input({required:true}) name!: string

  isAddTask = false;

  tasks = dummyTasks

  get getUserTasks(){
    return this.tasks.filter((task) => task.userId === this.userId)
  }
  onCompleteUserTask(id:string) {
    this.tasks = this.tasks.filter((task)=> task.id !== id)
  }
  onAddTask() {
    this.isAddTask = true
  }
  onClosingDialog(){
    this.isAddTask = false
  }
  onAddingTask(task:AddTaskModel) {
    this.tasks.unshift({
      id: new Date().getTime().toString(),
      dueDate: task.date,
      summary:task.summary,
      title: task.title,
      userId: this.userId
    })
    this.isAddTask = false
  }
}

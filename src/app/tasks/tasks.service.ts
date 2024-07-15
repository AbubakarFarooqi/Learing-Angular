import { Injectable } from "@angular/core";
import { dummyTasks } from "./Dummy-Tasks";
import { AddTaskModel } from "./new-task/add-task.model";

@Injectable({providedIn:'root'})

export class TaskService{
    private  tasks = dummyTasks

    getUserTasks(userId:string){
        return this.tasks.filter((task) => task.userId === userId)
    }
    completeUserTask(id:string) {
      this.tasks = this.tasks.filter((task)=> task.id !== id)
    }
    addingTask(task:AddTaskModel,userId:string) {
      this.tasks.unshift({
        id: new Date().getTime().toString(),
        dueDate: task.date,
        summary:task.summary,
        title: task.title,
        userId: userId
      })
    }
    
}
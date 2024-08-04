import { Component, computed, inject, input, OnInit } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  private _taskService = inject(TasksService);
  userId = input.required<string>();
  order = input<'asc' | 'dsc'>();
  userTasks = computed(() => {
    return this._taskService
      .allTasks()
      .filter((t) => {
        return t.userId === this.userId();
      })
      .sort((a, b) => {
        if (this.order() === 'dsc') {
          return a.id > b.id ? -1 : 1;
        }
        return a.id > b.id ? 1 : -1;
      });
  });
}

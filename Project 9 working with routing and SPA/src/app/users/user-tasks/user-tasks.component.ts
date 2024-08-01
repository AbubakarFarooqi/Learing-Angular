import { Component, computed, inject, input } from '@angular/core';
import { UsersService } from '../users.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet],
})
export class UserTasksComponent {
  userId = input.required<string>();
  private _userService = inject(UsersService);

  userName = computed(() => {
    return this._userService.users.find((u) => u.id == this.userId())?.name;
  });
}

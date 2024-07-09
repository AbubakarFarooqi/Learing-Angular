import { Component } from '@angular/core';
import { HeaderCompoenent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { DUMMY_USERS } from './dummy-users';
import { TasksComponent } from './tasks/tasks.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderCompoenent,UserComponent,TasksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'first-angular-project';
  users = DUMMY_USERS;
  currentUserId?: string

  get currentUserName(){
    return this.users.find(user => user.id === this.currentUserId)?.name
  }

  onUserSelect(id:string){
    this.currentUserId = id
  }
}

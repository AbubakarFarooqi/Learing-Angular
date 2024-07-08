import { Component } from '@angular/core';
import { HeaderCompoenent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { DUMMY_USERS } from './dummy-users';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderCompoenent,UserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'first-angular-project';
  users = DUMMY_USERS;

  onUserSelect(id:string){
    console.log(id);
  }
}

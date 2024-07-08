import { Component } from '@angular/core';
import { DUMMY_USERS } from '../dummy-users';
import { MapType } from '@angular/compiler';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
    selectedUser = DUMMY_USERS[Math.floor(Math.random()*DUMMY_USERS.length)];
    get imagePath(){
      return `assets/users/${this.selectedUser.avatar}`
    }

    onSelectedUser() {
      console.log(`button clicked`)
      this.selectedUser = DUMMY_USERS[Math.floor(Math.random()*DUMMY_USERS.length)];
    }
}

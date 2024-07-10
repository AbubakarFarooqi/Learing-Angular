import { Component,Input,input,computed,Output,EventEmitter } from '@angular/core';
import { DUMMY_USERS } from '../dummy-users';
import { MapType } from '@angular/compiler';
import { type User } from './user.model';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  
    //Zone.js 
    // selectedUser = DUMMY_USERS[Math.floor(Math.random()*DUMMY_USERS.length)];
   
    //Input using Input Decorator
    // @Input({required:true}) id!: string
    // @Input({required:true}) avatar!: string
    // @Input({required:true}) name!: string

    //input an object
    @Input({required:true}) user!: User
    @Input({required:true}) isUserSelected!:boolean

    //Output Data
    @Output() select = new EventEmitter<string>() 

    //Input using input signal
    // avatar = input.required<string>()
    // name = input.required<string>()

    // Signal
    // selectedUser = signal(DUMMY_USERS[Math.floor(Math.random()*DUMMY_USERS.length)]);
    
   // Compted value using getter
    get imagePath(){
      return `assets/users/${this.user.avatar}`
    }

    //Computed Value using Computed
   // imagePath = computed(()=>`assets/users/${this.avatar()}`)


    onSelectedUser() {
      this.select.emit(this.user.id)
    }
}

import { Component,Input,input,computed,Output,EventEmitter } from '@angular/core';
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
    //Zone.js 
    // selectedUser = DUMMY_USERS[Math.floor(Math.random()*DUMMY_USERS.length)];
   
    //Input using Input Decorator
    @Input({required:true}) id!: string
    @Input({required:true}) avatar!: string
    @Input({required:true}) name!: string

    //Output Data
    @Output() select = new EventEmitter() 

    //Input using input signal
    // avatar = input.required<string>()
    // name = input.required<string>()

    // Signal
    // selectedUser = signal(DUMMY_USERS[Math.floor(Math.random()*DUMMY_USERS.length)]);
    
   // Compted value using getter
    get imagePath(){
      return `assets/users/${this.avatar}`
    }

    //Computed Value using Computed
   // imagePath = computed(()=>`assets/users/${this.avatar()}`)


    onSelectedUser() {
      this.select.emit(this.id)
    }
}

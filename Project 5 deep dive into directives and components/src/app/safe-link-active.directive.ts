import { Directive } from '@angular/core';

@Directive({
  selector: '[appSafeLinkActive]',
  standalone: true,
  host:{
    '(click)':'onClick($event)'
  }
})
export class SafeLinkActiveDirective {

  constructor() {
      console.log("Safe llink in activated")
   }

   onClick(event :MouseEvent){
    const wantsToLeave  = window.confirm("Do you want to leave this page")
    if(wantsToLeave){
      return;
    }
    event.preventDefault();
  }

}

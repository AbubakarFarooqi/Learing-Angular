import { Directive, input } from '@angular/core';

@Directive({
  selector: '[appSafeLinkActive]',
  standalone: true,
  host:{
    '(click)':'onClick($event)'
  }
})
export class SafeLinkActiveDirective {

  queryParam = input('myApp',{alias:'appSafeLinkActive'})

  constructor() {
      console.log("Safe llink in activated")
   }

   onClick(event :MouseEvent){
    const wantsToLeave  = window.confirm("Do you want to leave this page")
    if(wantsToLeave){
      (event.target as HTMLAnchorElement).href =(event.target as HTMLAnchorElement).href + `?from=${this.queryParam()}`
      return;
    }
    event.preventDefault();
  }

}

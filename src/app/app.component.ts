import { Component } from '@angular/core';
import { HeaderCompoenent } from './header/header.component';
import { UserComponent } from './user/user.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderCompoenent,UserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'first-angular-project';
}

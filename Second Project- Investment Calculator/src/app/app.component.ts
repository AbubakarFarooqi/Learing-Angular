import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserInputComponent } from './user-input/user-input.component';
import { InvestementResultComponent } from "./investement-result/investement-result.component";

@Component({
  selector: 'app-root',
  // standalone: true,
  //imports: [HeaderComponent, UserInputComponent, InvestementResultComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}

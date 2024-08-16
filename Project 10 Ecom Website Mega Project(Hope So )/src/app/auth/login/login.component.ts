import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomButtonComponent } from '../../shared/custom-button/custom-button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CustomButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {}

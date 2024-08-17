import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomButtonComponent } from '../../shared/custom-button/custom-button.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CustomButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private _authService = inject(AuthService);
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  onLogin() {
    console.log(this.loginForm);
    this._authService
      .login(
        this.loginForm.controls.email.value!,
        this.loginForm.controls.password.value!
      )
      .subscribe({
        next: (val) => {},
        error: () => {
          console.log('azan');
        },
      });
  }
}

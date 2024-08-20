import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomButtonComponent } from '../../shared/custom-button/custom-button.component';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CustomButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.returnUrl = params['returnUrl'];
    });
  }
  private _authService = inject(AuthService);
  private _router = inject(Router);
  returnUrl?: string;
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
        next: (val) => {
          if (val) {
            if (this.returnUrl) {
              this._router.navigate(['/', this.returnUrl], {
                replaceUrl: true,
              });
            } else {
              this._router.navigate(['/'], {
                replaceUrl: true,
              });
            }
          }
        },
        error: () => {
          console.log('azan');
        },
      });
  }
}

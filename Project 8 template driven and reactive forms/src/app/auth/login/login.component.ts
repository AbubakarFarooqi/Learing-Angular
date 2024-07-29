// import {
//   afterNextRender,
//   Component,
//   DestroyRef,
//   inject,
//   viewChild,
// } from '@angular/core';
// import { EmailValidator, FormsModule, NgForm } from '@angular/forms';
// import { debounceTime } from 'rxjs';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css',
//   imports: [FormsModule],
// })
// export class LoginComponent {
//   private form = viewChild<NgForm>('form');
//   private destroyRef = inject(DestroyRef);
//   constructor() {
//     afterNextRender(() => {
//       const savedEmail = window.localStorage.getItem('email');
//       if (savedEmail) {
//         setTimeout(() => {
//           this.form()?.controls['email'].setValue(savedEmail);
//         });
//       }

//       const subscription = this.form()
//         ?.valueChanges?.pipe(debounceTime(500))
//         .subscribe({
//           next: (value) => {
//             window.localStorage.setItem('email', value.email);
//           },
//         });

//       this.destroyRef.onDestroy(() => {
//         subscription?.unsubscribe();
//       });
//     });
//   }

//   onSubmitForm(formData: NgForm) {
//     console.log(formData.form);
//   }
// }

import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  get isValidEmail() {
    return (
      this.loginForm.controls.email.touched &&
      this.loginForm.controls.email.dirty &&
      this.loginForm.controls.email.invalid
    );
  }
  get isValidPassword() {
    return (
      this.loginForm.controls.password.touched &&
      this.loginForm.controls.password.dirty &&
      this.loginForm.controls.password.invalid
    );
  }

  onSubmit() {
    console.log(this.loginForm.controls.email.value);
    console.log(this.loginForm.controls.password.value);
  }
}

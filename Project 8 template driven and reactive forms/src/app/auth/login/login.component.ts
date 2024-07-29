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

import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  EmailValidator,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime, delay, of } from 'rxjs';

// validation using factory function
function mustContain(char: string) {
  return (control: AbstractControl) => {
    if (control.value.includes(char)) return null;
    return { doesNotContainChar: true };
  };
}

function mustContainQuestionMark(control: AbstractControl) {
  if (control.value.includes('?')) return null;
  return { doesNotContainQuestionMark: true };
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const email = window.localStorage.getItem('email');
    if (email) {
      this.loginForm.patchValue({
        email: email,
      });
    }
    const subscription = this.loginForm.valueChanges
      .pipe(debounceTime(3000))
      .subscribe({
        next: (value) => {
          if (value.email) window.localStorage.setItem('email', value.email);
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(6),
        mustContainQuestionMark,
        mustContain('a'),
      ],
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

import { Component } from '@angular/core';
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signupForm = new FormGroup({
    emailControl: new FormControl('', {
      validators: [Validators.required],
    }),
    passwordControl: new FormControl('', {
      validators: [Validators.required],
    }),
    confirmPasswordControl: new FormControl('', {
      validators: [Validators.required],
    }),
  });
  onSubmit() {
    console.log(this.signupForm.controls.emailControl.value);
    console.log(this.signupForm.controls.passwordControl.value);
    console.log(this.signupForm.controls.confirmPasswordControl.value);
  }
}

import { Component } from '@angular/core';
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';
import {
  FormArray,
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
  l = [1, 2, 3];
  signupForm = new FormGroup({
    emailControl: new FormControl('', {
      validators: [Validators.required],
    }),
    passwordsSubForm: new FormGroup({
      passwordControl: new FormControl('', {
        validators: [Validators.required],
      }),
      confirmPasswordControl: new FormControl('', {
        validators: [Validators.required],
      }),
    }),
    firstName: new FormControl('', { validators: [Validators.required] }),
    lastName: new FormControl('', { validators: [Validators.required] }),
    addressSubform: new FormGroup({
      street: new FormControl('', { validators: [Validators.required] }),
      number: new FormControl('', { validators: [Validators.required] }),
      postalCode: new FormControl('', { validators: [Validators.required] }),
      city: new FormControl('', { validators: [Validators.required] }),
    }),
    role: new FormControl<
      'student' | 'teacher' | 'employee' | 'founder' | 'other'
    >('student', { validators: [Validators.required] }),
    agree: new FormControl(true, { validators: [Validators.required] }),

    source: new FormArray([
      new FormControl(false),
      new FormControl(true),
      new FormControl(false),
    ]),
  });
  get sourceArray() {
    return this.signupForm.controls.source.controls;
  }
  onSubmit() {
    console.log(this.signupForm);
  }
}

import {
  afterNextRender,
  Component,
  DestroyRef,
  inject,
  viewChild,
} from '@angular/core';
import { EmailValidator, FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule],
})
export class LoginComponent {
  private form = viewChild<NgForm>('form');
  private destroyRef = inject(DestroyRef);
  constructor() {
    afterNextRender(() => {
      const savedEmail = window.localStorage.getItem('email');
      if (savedEmail) {
        setTimeout(() => {
          this.form()?.controls['email'].setValue(savedEmail);
        });
      }

      const subscription = this.form()
        ?.valueChanges?.pipe(debounceTime(500))
        .subscribe({
          next: (value) => {
            window.localStorage.setItem('email', value.email);
          },
        });

      this.destroyRef.onDestroy(() => {
        subscription?.unsubscribe();
      });
    });
  }

  onSubmitForm(formData: NgForm) {
    console.log(formData.form);
  }
}

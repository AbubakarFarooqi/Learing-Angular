import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { routes } from '../app.routes';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [ReactiveFormsModule, RouterLink, RouterLinkActive],
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private _authService = inject(AuthService);
  private _router = inject(Router);

  get isUserLoggedIn() {
    return this._authService.isTokenValid();
  }
  searchForm = new FormGroup({
    searchInput: new FormControl('', [Validators.required]),
  });
  onSearch() {
    if (this.searchForm.invalid) {
      return;
    }
    // Implement Search logic here in future
    this.searchForm.reset();
  }

  onLogoutClick() {
    const confirmLogout = window.confirm('Do you want to logout');
    if (confirmLogout) {
      this._authService.logout();
      this._router.navigate([''], { replaceUrl: true });
    }
  }
  onLoginClick() {
    this._router.navigate(['login']);
  }
}

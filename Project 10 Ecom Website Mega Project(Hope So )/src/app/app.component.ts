import { Component, inject, OnInit } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [HeaderComponent, RouterOutlet, FooterComponent],
})
export class AppComponent implements OnInit {
  private _authService = inject(AuthService);
  ngOnInit(): void {
    this._authService.loadTokensFromBrowserStorage();
  }
}

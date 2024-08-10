import { Component } from '@angular/core';
import { LandingComponent } from './landing/landing.component';
import { TopSellingComponent } from './top-selling/top-selling.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [LandingComponent, TopSellingComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {}

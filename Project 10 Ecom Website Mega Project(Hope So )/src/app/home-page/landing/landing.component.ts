import { Component } from '@angular/core';
import { CustomButtonComponent } from '../../shared/custom-button/custom-button.component';
import { CounterComponent } from '../../shared/counter/counter.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CustomButtonComponent, CounterComponent, RouterLink],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {}

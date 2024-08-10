import { Component } from '@angular/core';
import { CustomButtonComponent } from '../../shared/custom-button/custom-button.component';
import { CounterComponent } from '../../shared/counter/counter.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CustomButtonComponent, CounterComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {}

import {
  afterNextRender,
  afterRender,
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { CountUpModule } from 'ngx-countup';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CountUpModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
})
export class CounterComponent {
  value = input.required<number>();
  text = input.required<string>();
  duration = input.required<number>();
}

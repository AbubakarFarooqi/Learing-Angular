import { Component } from '@angular/core';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
@Component({
  selector: 'app-top-selling',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './top-selling.component.html',
  styleUrl: './top-selling.component.css',
})
export class TopSellingComponent {}

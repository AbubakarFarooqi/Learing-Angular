import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Cart } from '../../models/cart.model';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  private _cartService = inject(CartService);

  get cartItems() {
    console.log(this._cartService.cartItems);
    return this._cartService.cartItems;
  }
}

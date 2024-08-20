import { Injectable } from '@angular/core';
import { Cart } from '../../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {
    console.log('Cart Service initialized');
  }
  cartItems: Cart[] = [];

  insertItem(cartItem: Cart) {
    this.cartItems.push(cartItem);
    console.log(this.cartItems);
  }
}

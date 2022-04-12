import { Injectable } from '@angular/core';
const CART_KEY = 'cart-user';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  constructor() { }
  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveCart(cart: any): void {
    window.sessionStorage.removeItem(CART_KEY);
    window.sessionStorage.setItem(CART_KEY, JSON.stringify(cart));
  }
  public getCart(): any {
    const cart = window.sessionStorage.getItem(CART_KEY);
    if (cart) {
      return JSON.parse(cart);
    }
    return {};
  }
}
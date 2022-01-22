import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {CartLine} from '../class/cart-line';
import {Product} from '../class/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartSource = new BehaviorSubject<Map<number, CartLine>>(new Map<number, CartLine>());
  public cart: any = this.cartSource.asObservable();

  private cartSizeSource = new BehaviorSubject<number>(0);
  public cartSize: any = this.cartSizeSource.asObservable();

  constructor() {
  }

  addToCart(product: Product, nb: number): void {
    const cart: Map<number, CartLine> = this.cartSource.value;
    const productId = product.id;
    let jsonValue: CartLine = {product, qte: nb};
    if (cart.has(productId)) {
      const value: CartLine = cart.get(productId);
      jsonValue.qte = value.qte + nb;
    }
    cart.set(productId, jsonValue);
    this.setCart(cart);
    this.putCartInStorage();
    this.updateCartQuantity();
  }

  removeFromCart(product: Product, nb?: number): void {
    const cart: Map<number, CartLine> = this.cartSource.value;
    const productId = product.id;
    let jsonValue: CartLine;
    if (cart.has(productId)) {
      jsonValue = cart.get(productId);
    } else {
      return;
    }

    if (jsonValue.qte === nb || jsonValue.qte < nb) {
      cart.delete(productId);
    } else {
      jsonValue.qte = jsonValue.qte - nb;
      cart.set(productId, jsonValue);
    }

    this.setCart(cart);
    this.putCartInStorage();
    this.updateCartQuantity();
  }

  putCartInStorage(): void {
    window.sessionStorage.setItem('cart', this.convertMapToStr(this.cartSource.value));
  }

  updateCartFromStorage(): void {
    const strCart = window.sessionStorage.getItem('cart');
    if (strCart) {
        this.setCart(this.convertStrToMap(strCart));
        this.updateCartQuantity();
      }
  }

  convertMapToStr(tsMap): string {
    const jsObj = {};
    tsMap.forEach((value, key) => {
      jsObj[key] = value;
    });
    return JSON.stringify(jsObj);
  }

  convertStrToMap(jsObj): Map<number, CartLine> {
    const tsMap = new Map();
    const arrayOfMapEntries = new Map<any, any>(Object.entries(JSON.parse(jsObj)));
    for (const [key, value] of arrayOfMapEntries.entries()) {
      tsMap.set(key, value);
    }
    return tsMap;
  }


  getCart(): any {
    return this.cartSource.asObservable();
  }

  setCart(cart: any): void {
    this.cartSource.next(cart);
  }

  getCartSize(): any {
    return this.cartSizeSource.asObservable();
  }

  setCartSize(cartSize: any): void {
    this.cartSizeSource.next(cartSize);
  }

  updateCartQuantity(): void {
    const cart = this.cartSource.value;
    let tot = 0;

    const size = cart.size;
    let i = 0;
    cart.forEach((value: CartLine, key: number) => {
      i++;
      tot += value.qte;
      if (i === size) {
        this.setCartSize(tot);
      }
    });
  }
}

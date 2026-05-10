import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
 
  carrito: any[] = [];

addProduct(product: any) {
  this.carrito.push(product);
}

getCarrito() {
  return this.carrito;
}

deleteProduct(id: number) {
  this.carrito = this.carrito.filter(p => p.id !== id);
}

getSubtotal() {
  return this.carrito.reduce((acc, p) => acc + p.price, 0);
}

getImpuestos() {
  return this.getSubtotal() * 0.19;
}

getEnvio() {
  return 10000;
}

getTotal() {
  return this.getSubtotal() + this.getImpuestos() + this.getEnvio();
}
}

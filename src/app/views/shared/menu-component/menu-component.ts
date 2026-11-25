import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CounterComponent } from '../counter-component/counter-component';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart';
import { ProductService } from '../../../services/product.service';
import { SessionService } from '../../../services/session.service';

@Component({
  standalone: true,
  selector: 'app-menu-component',
  imports: [CounterComponent, CommonModule],
  templateUrl: './menu-component.html',
  styleUrls: ['./menu-component.css'],
})
export class MenuComponent {

  private router = inject(Router);
  public cartService = inject(CartService);
  private productService = inject(ProductService);
  public session = inject(SessionService);

  navigateTo(path: string): void {
    this.router.navigate([path]);
    this.closePopUp(); // al navegar siempre se cierra el carrito
    this.showUserMenu = false;
  }

  ShowPopUp: boolean = false;

  openPopUp() {
    this.ShowPopUp = true;
  }

  closePopUp() {
    this.ShowPopUp = false;
  }

  showUserMenu: boolean = false;

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  closeUserMenu(): void {
    this.showUserMenu = false;
  }

  irAMiCuenta(): void {
    this.showUserMenu = false;
    this.router.navigate(['/mi-cuenta']);
  }

  cerrarSesion(): void {
    this.showUserMenu = false;
    this.closePopUp();
    this.session.cerrarSesion();
  }

  imagenDe(idProducto: number): string {
    const item = this.cartService.items().find((i) => i.producto.idProducto === idProducto);
    return item ? this.productService.imagenDe(item.producto) : '';
  }

  eliminarProducto(idProducto: number) {
    this.cartService.eliminar(idProducto);
  }

  cambiarCantidad(idProducto: number, cantidad: number) {
    this.cartService.cambiarCantidad(idProducto, cantidad);
  }

  currencyFormat(valor: number): string {
    return `$${valor.toLocaleString('es-CO')}`;
  }
}
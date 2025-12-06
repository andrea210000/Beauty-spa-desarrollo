import { Component, EventEmitter, Output } from '@angular/core';
import { routes } from '../../../app.routes';
import { Router } from '@angular/router';
import { CounterComponent } from '../counter-component/counter-component';
import { CommonModule } from '@angular/common';


@Component({
  standalone: true,
  selector: 'app-menu-component',
  imports: [CounterComponent, CommonModule],
  templateUrl: './menu-component.html',
  styleUrl: './menu-component.css',
})
export class MenuComponent {
  constructor(private router: Router) { }

    productos = [
    { id: 1, name: 'Lip Balm', price: 5000, size: '50g', image: '/assets/images/lip-balm.jpg', amount: 1 },
    { id: 2, name: 'Gel de ducha', price: 40000, size: '250ml', image: '/assets/images/shower-gel.jpg', amount: 1 },
    { id: 3, name: 'Serum', price: 20000, size: '100ml', image: '/assets/images/serum.jpg', amount: 1 },
  ];

  navigateTo(path: string): void {
    this.router.navigate([path]);
  };

  @Output() openCart = new EventEmitter<void>();


  ShowPopUp: boolean = false;

  openPopUp() {
    this.ShowPopUp = true;
  }

  closePopUp() {
    this.ShowPopUp = false;
  };

  onDeleteProduct(id: number) {
    this.productos = this.productos.filter(product => product.id !== id);
  }
  @Output() close = new EventEmitter<void>();
}


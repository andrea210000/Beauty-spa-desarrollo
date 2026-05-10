import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CounterComponent } from '../counter-component/counter-component';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart';


@Component({
  standalone: true,
  selector: 'app-menu-component',
  imports: [CounterComponent, CommonModule],
  templateUrl: './menu-component.html',
  styleUrls: ['./menu-component.css'],
})
export class MenuComponent {
  constructor(private router: Router, public cartService: CartService) { }

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
    this.cartService.deleteProduct(id);
  }
  @Output() close = new EventEmitter<void>();
}


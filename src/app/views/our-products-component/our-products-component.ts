import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-our-products-component',
  imports: [CommonModule],
  templateUrl: './our-products-component.html',
  styleUrl: './our-products-component.css',
})
export class OurProductsComponent implements OnInit {
  
  productos: any[] = [];

  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit() {
    this.productos = this.productService.getProductos();
  }
  
  getProductosPorCategoria(categoria: string) {
    return this.productos.filter(p => p.category === categoria);
  }

  agregarAlCarrito(producto: any) {
    this.cartService.addProduct(producto);
  }
}

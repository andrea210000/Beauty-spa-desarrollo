import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ProductService, Producto } from '../../services/product.service';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-our-products-component',
  standalone: true,
  imports: [CommonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './our-products-component.html',
  styleUrl: './our-products-component.css',
})
export class OurProductsComponent implements OnInit {

  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private messageService = inject(MessageService);

  cargando = signal(false);
  productos = signal<Producto[]>([]);
  categorias = signal<string[]>([]);
  filtro = signal<string | null>(null); // null = todas las categorías

  // Orden oficial de las categorías de la BD
  private ordenCategorias = ['CUIDADO DE LA PIEL', 'CUIDADO CAPILAR', 'ESTETICA Y BELLEZA'];

  ngOnInit(): void {
    this.cargando.set(true);

    this.productService.obtenerProductos().subscribe({
      next: (lista) => {
        this.productos.set(lista);
        const existentes = new Set(lista.map((p) => p.categoriaNombre));
        this.categorias.set(this.ordenCategorias.filter((c) => existentes.has(c)));
      },
      error: (err) => {
        console.error('Error al cargar productos', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los productos',
          life: 4000,
        });
      },
      complete: () => this.cargando.set(false),
    });
  }

  // Categorías que se muestran según el filtro activo
  get categoriasVisibles(): string[] {
    const activo = this.filtro();
    return activo ? [activo] : this.categorias();
  }

  porCategoria(categoria: string): Producto[] {
    return this.productos().filter((p) => p.categoriaNombre === categoria);
  }

  imagenDe(p: Producto): string {
    return this.productService.imagenDe(p);
  }

  elegirFiltro(categoria: string | null): void {
    this.filtro.set(categoria);
  }

  agotado(p: Producto): boolean {
    return p.stock <= 0;
  }

  stockBajo(p: Producto): boolean {
    return p.stock > 0 && p.stock <= 8;
  }

  agregarAlCarrito(p: Producto): void {
    if (this.agotado(p)) return;

    // No dejar pasar el stock disponible
    if (this.cartService.cantidadDe(p.idProducto) >= p.stock) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Stock limitado',
        detail: `Solo hay ${p.stock} unidades de ${p.nombre}`,
        life: 3000,
      });
      return;
    }

    this.cartService.agregar(p);
    this.messageService.add({
      severity: 'success',
      summary: 'Agregado al carrito',
      detail: `${p.nombre} · ${p.medida}`,
      life: 2500,
    });
  }
}
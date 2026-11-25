import { Injectable, signal, computed } from '@angular/core';
import { Producto } from './product.service';

// Un producto dentro del carrito, con su cantidad
export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

const STORAGE_KEY = 'beauty_cart';

@Injectable({ providedIn: 'root' })
export class CartService {

  // Carrito reactivo (signal): todos los cambios actualizan la vista sola
  items = signal<ItemCarrito[]>(CartService.cargar());

  // Valores derivados del carrito
  totalItems = computed(() => this.items().reduce((acc, i) => acc + i.cantidad, 0));
  subtotal = computed(() => this.items().reduce((acc, i) => acc + i.producto.precio * i.cantidad, 0));
  impuestos = computed(() => Math.round(this.subtotal() * 0.19));
  envio = computed(() => (this.items().length > 0 ? 10000 : 0));
  total = computed(() => this.subtotal() + this.impuestos() + this.envio());

  // Agrega el producto; si ya está, suma 1 a la cantidad
  agregar(producto: Producto): void {
    const actuales = this.items();
    const existente = actuales.find((i) => i.producto.idProducto === producto.idProducto);

    if (existente) {
      this.items.set(
        actuales.map((i) =>
          i.producto.idProducto === producto.idProducto
            ? { ...i, cantidad: i.cantidad + 1 }
            : i
        )
      );
    } else {
      this.items.set([...actuales, { producto, cantidad: 1 }]);
    }

    this.persistir();
  }

  cambiarCantidad(idProducto: number, cantidad: number): void {
    if (cantidad < 1) return;
    this.items.set(
      this.items().map((i) =>
        i.producto.idProducto === idProducto ? { ...i, cantidad } : i
      )
    );
    this.persistir();
  }

  eliminar(idProducto: number): void {
    this.items.set(this.items().filter((i) => i.producto.idProducto !== idProducto));
    this.persistir();
  }

  cantidadDe(idProducto: number): number {
    return this.items().find((i) => i.producto.idProducto === idProducto)?.cantidad ?? 0;
  }

  vaciar(): void {
    this.items.set([]);
    this.persistir();
  }

  // Guarda el carrito en localStorage para que sobreviva al refrescar
  private persistir(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items()));
    } catch {
      // Si el navegador bloquea localStorage, el carrito sigue funcionando en memoria
    }
  }

  private static cargar(): ItemCarrito[] {
    try {
      const crudo = localStorage.getItem(STORAGE_KEY);
      if (!crudo) return [];
      const datos = JSON.parse(crudo);
      if (!Array.isArray(datos)) return [];
      return datos.filter((i) => i && i.producto && i.cantidad > 0);
    } catch {
      return [];
    }
  }
}
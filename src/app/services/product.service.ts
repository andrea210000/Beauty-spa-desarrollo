import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

// Estructura que devuelve GET api/Producto/ObtenerProductos
export interface Producto {
  idProducto: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  medida: string;
  categoriaNombre: string;
  estado: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  // La tabla producto NO tiene campo imagen, así que mapeamos
  // las fotos que ya existen en assets/images por id de producto.
  private imagenes: Record<number, string> = {
    2: '/assets/images/exfoliant.jpg',
    3: '/assets/images/oil.jpg',
    4: '/assets/images/serum.jpg',
    5: '/assets/images/facial-toner.jpg',
    6: '/assets/images/shower-gel.jpg',
    7: '/assets/images/crema-manos.jpeg',
    8: '/assets/images/manteca-corporal.jpeg',
    10: '/assets/images/hair-mask.jpg',
    11: '/assets/images/aceite-capilar.jpg',
    12: '/assets/images/serum-capilar.jpg',
    13: '/assets/images/aceite-puntas.jpg',
    14: '/assets/images/crema-multi.jpg',
    15: '/assets/images/aceite-corpo.jpg',
    16: '/assets/images/tonico-facial.jpg',
    17: '/assets/images/serum-ilum.jpg',
    18: '/assets/images/cream.jpg',
  };

  // Respaldo por categoría si aparece un producto nuevo fuera del mapa
  private imagenesPorCategoria: Record<string, string> = {
    'CUIDADO DE LA PIEL': '/assets/images/cream.jpg',
    'CUIDADO CAPILAR': '/assets/images/hair-mask.jpg',
    'ESTETICA Y BELLEZA': '/assets/images/serum-ilum.jpg',
  };

  // GET api/Producto/ObtenerProductos
  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}api/Producto/ObtenerProductos`);
  }

  imagenDe(producto: Producto): string {
    return this.imagenes[producto.idProducto]
      ?? this.imagenesPorCategoria[producto.categoriaNombre]
      ?? '/assets/images/cream.jpg';
  }
}
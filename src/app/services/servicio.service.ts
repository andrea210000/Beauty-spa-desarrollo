import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

// 📋 Estructura que devuelve la API en ServicioResponseDto
export interface Servicio {
  idServicios: number;
  nombre: string;
  descripcion: string;
  costo: number;
  insumos: number;
  duracionMinutos: number;
  idEstado: number;
  estadoNombre: string;
  idCategoriaServicio: number;
  categoriaNombre: string;
}

@Injectable({ providedIn: 'root' })
export class ServicioService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  // GET api/Servicio/ObtenerServicios?soloActivos=true
  obtenerServicios(soloActivos = true): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(
      `${this.apiUrl}api/Servicio/ObtenerServicios?soloActivos=${soloActivos}`
    );
  }
}
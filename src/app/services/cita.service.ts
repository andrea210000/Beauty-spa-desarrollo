import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

// 📋 Estructura de un servicio dentro de una cita (lo que la API devuelve en CitaResponseDto)
export interface CitaServicio {
  idServicio: number;
  nombre: string;
  precioAplicado: number;
}

// 📋 Estructura de una cita
export interface Cita {
  idCita: number;
  fechaHora: string;
  idEstado: number;
  estadoNombre: string;
  notas: string | null;
  total: number;
  servicios: CitaServicio[];
}

// 📦 Payload para crear una cita
export interface CitaCreatePayload {
  fechaHora: string;      // formato local: 2026-09-25T15:30:00
  idServicios: number[];
  notas?: string | null;
}

@Injectable({ providedIn: 'root' })
export class CitaService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  crearCita(data: CitaCreatePayload): Observable<{ mensaje: string; idCita: number }> {
    return this.http.post<{ mensaje: string; idCita: number }>(
      `${this.apiUrl}api/Cita/CrearCita`,
      data
    );
  }

  misCitas(): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.apiUrl}api/Cita/MisCitas`);
  }

  cancelarCita(idCita: number): Observable<string> {
    return this.http.put(`${this.apiUrl}api/Cita/CancelarCita/${idCita}`, {}, { responseType: 'text' });
  }
}
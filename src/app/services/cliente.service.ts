import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

// 📋 Datos de MI cuenta (los devuelve GET api/Cliente/MiPerfil)
export interface MiPerfil {
  idCliente: number;
  nombres: string;
  apellidos: string;
  correo: string;
  telefono: string | null;
  idTipoIdentificacion: number;
  tipoIdentificacionNombre: string;
  numeroIdentificacion: string;
  idUsuario: number;
  usuario: string;
  fechaRegistro: string;
  idRol: number;
  rolNombre: string;
}

// 📦 Campos editables del perfil
export interface MiPerfilUpdate {
  nombres: string;
  apellidos: string;
  correo: string;
  telefono: string;
}

// 📦 Cambio de contraseña
export interface CambiarPassword {
  contrasenaActual: string;
  contrasenaNueva: string;
}

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  miPerfil(): Observable<MiPerfil> {
    return this.http.get<MiPerfil>(`${this.apiUrl}api/Cliente/MiPerfil`);
  }

  actualizarMiPerfil(data: MiPerfilUpdate): Observable<{ mensaje: string }> {
    return this.http.put<{ mensaje: string }>(`${this.apiUrl}api/Cliente/ActualizarMiPerfil`, data);
  }

  cambiarPassword(data: CambiarPassword): Observable<{ mensaje: string }> {
    return this.http.put<{ mensaje: string }>(`${this.apiUrl}api/Cliente/CambiarPassword`, data);
  }
}
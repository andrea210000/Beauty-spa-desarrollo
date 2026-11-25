import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

const TOKEN_KEY = 'accessToken';

// Claims REALES del JWT que genera la API (verificados con un token real):
// la API usa las claves completas en URI, no las cortas.
const CLAIM_ID = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier';
const CLAIM_USUARIO = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name';
const CLAIM_ROL = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
const CLAIM_FECHA = 'FechaRegistro';

// Lee la sesión desde el token guardado en localStorage.
// No toca la API: solo decodifica el JWT (sin verificar firma, eso lo hace el servidor).
@Injectable({ providedIn: 'root' })
export class SessionService {
  private router = inject(Router);

  readonly usuario = signal<string | null>(null);
  readonly idUsuario = signal<number | null>(null);
  readonly rol = signal<string | null>(null);
  readonly fechaRegistro = signal<string | null>(null);

  get logueado(): boolean {
    return this.usuario() !== null;
  }

  constructor() {
    this.cargarDesdeToken();
  }

  cargarDesdeToken(): void {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return;

    try {
      const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(atob(base64));

      // Token vencido = sesión vencida
      if (typeof payload['exp'] === 'number' && payload['exp'] * 1000 < Date.now()) {
        this.limpiar();
        return;
      }

      const id = Number(payload[CLAIM_ID]);
      const usuario = payload[CLAIM_USUARIO];

      if (Number.isNaN(id) || !usuario) {
        this.limpiar();
        return;
      }

      this.idUsuario.set(id);
      this.usuario.set(String(usuario));
      this.rol.set(payload[CLAIM_ROL] ? String(payload[CLAIM_ROL]) : null);
      this.fechaRegistro.set(payload[CLAIM_FECHA] ?? null);
    } catch {
      // Token corrupto: se borra para no dejar una sesión fantasma
      this.limpiar();
    }
  }

  cerrarSesion(): void {
    this.limpiar();
    this.router.navigate(['/']);
  }

  private limpiar(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.usuario.set(null);
    this.idUsuario.set(null);
    this.rol.set(null);
    this.fechaRegistro.set(null);
  }
}
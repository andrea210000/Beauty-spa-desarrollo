import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../services/session.service';

// Protege rutas privadas: sin sesión (o con token vencido) manda al login.
export const authGuard: CanActivateFn = () => {
  const session = inject(SessionService);
  const router = inject(Router);
  return session.logueado ? true : router.createUrlTree(['/login']);
};
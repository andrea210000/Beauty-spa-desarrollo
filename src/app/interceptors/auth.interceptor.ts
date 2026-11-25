import { HttpInterceptorFn } from '@angular/common/http';

// 🔐 Interceptor: "el cartero" que antes de enviar CUALQUIER petición HTTP
// agrega el encabezado Authorization: Bearer <token>. Así el backend sabe
// quién está logueado sin repetir código en cada servicio.
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('accessToken');

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(cloned);
  }

  return next(req);
};
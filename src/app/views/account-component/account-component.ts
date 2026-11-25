import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SessionService } from '../../services/session.service';
import { ClienteService, MiPerfil } from '../../services/cliente.service';
import { CitaService, Cita } from '../../services/cita.service';

const AVATAR_KEY = 'beauty_avatar';

type Seccion = 'datos' | 'citas' | 'seguridad';

@Component({
  selector: 'app-account-component',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastModule],
  providers: [MessageService],
  templateUrl: './account-component.html',
  styleUrls: ['./account-component.css'],
})
export class AccountComponent implements OnInit {

  private router = inject(Router);
  private messageService = inject(MessageService);
  private clienteService = inject(ClienteService);
  private citaService = inject(CitaService);
  public session = inject(SessionService);

  perfil = signal<MiPerfil | null>(null);
  citas = signal<Cita[]>([]);
  cargando = signal(true);
  seccion = signal<Seccion>('datos');
  guardando = signal(false);
  cambiandoPass = signal(false);

  // Formulario de datos personales
  form = { nombres: '', apellidos: '', correo: '', telefono: '' };

  // Formulario de cambio de contraseña
  passForm = { actual: '', nueva: '', confirmar: '' };

  // Foto de perfil: se guarda en el navegador (localStorage), no en la BD
  foto = signal<string | null>(this.leerFoto());

  ngOnInit(): void {
    this.cargarPerfil();
    this.cargarCitas();
  }

  // ---------- Datos personales ----------

  private cargarPerfil(): void {
    this.clienteService.miPerfil().subscribe({
      next: (perfil) => {
        this.perfil.set(perfil);
        this.form = {
          nombres: perfil.nombres,
          apellidos: perfil.apellidos,
          correo: perfil.correo,
          telefono: perfil.telefono ?? '',
        };
        this.cargando.set(false);
      },
      error: () => {
        this.cargando.set(false);
        this.messageService.add({
          severity: 'error',
          summary: 'No pudimos cargar tu cuenta',
          detail: 'Cierra sesión y vuelve a entrar',
          life: 4000,
        });
      },
    });
  }

  guardarPerfil(): void {
    if (!this.form.nombres.trim() || !this.form.apellidos.trim() || !this.form.correo.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Campos obligatorios',
        detail: 'Nombres, apellidos y correo no pueden quedar vacíos',
        life: 3000,
      });
      return;
    }

    if (!this.form.correo.includes('@')) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Correo inválido',
        detail: 'Escribe un correo con @ (ejemplo: correo@gmail.com)',
        life: 3000,
      });
      return;
    }

    this.guardando.set(true);
    this.clienteService.actualizarMiPerfil(this.form).subscribe({
      next: (res) => {
        this.guardando.set(false);
        const actual = this.perfil();
        if (actual) {
          this.perfil.set({
            ...actual,
            nombres: this.form.nombres,
            apellidos: this.form.apellidos,
            correo: this.form.correo,
            telefono: this.form.telefono,
          });
        }
        this.messageService.add({
          severity: 'success',
          summary: 'Perfil actualizado',
          detail: res.mensaje,
          life: 3000,
        });
      },
      error: (err) => {
        this.guardando.set(false);
        this.messageService.add({
          severity: 'error',
          summary: 'No se pudo guardar',
          detail: err.error?.mensaje ?? 'Intenta de nuevo',
          life: 4000,
        });
      },
    });
  }

  // ---------- Contraseña ----------

  cambiarPassword(): void {
    const { actual, nueva, confirmar } = this.passForm;

    if (!actual || !nueva || !confirmar) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Campos incompletos',
        detail: 'Escribe los tres campos de contraseña',
        life: 3000,
      });
      return;
    }

    if (nueva.length < 6) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Contraseña muy corta',
        detail: 'La nueva contraseña debe tener al menos 6 caracteres',
        life: 3000,
      });
      return;
    }

    if (nueva !== confirmar) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Las contraseñas no coinciden',
        detail: 'Revisa la confirmación de la nueva contraseña',
        life: 3000,
      });
      return;
    }

    this.cambiandoPass.set(true);
    this.clienteService.cambiarPassword({ contrasenaActual: actual, contrasenaNueva: nueva }).subscribe({
      next: (res) => {
        this.cambiandoPass.set(false);
        this.passForm = { actual: '', nueva: '', confirmar: '' };
        this.messageService.add({
          severity: 'success',
          summary: 'Contraseña cambiada',
          detail: res.mensaje,
          life: 3000,
        });
      },
      error: (err) => {
        this.cambiandoPass.set(false);
        this.messageService.add({
          severity: 'error',
          summary: 'No se pudo cambiar',
          detail: err.error?.mensaje ?? 'Intenta de nuevo',
          life: 4000,
        });
      },
    });
  }

  // ---------- Citas ----------

  private cargarCitas(): void {
    this.citaService.misCitas().subscribe({
      next: (citas) => this.citas.set(citas),
      error: () => {},
    });
  }

  puedeCancelar(cita: Cita): boolean {
    return cita.idEstado === 4 || cita.idEstado === 5; // PENDIENTE o CONFIRMADA
  }

  cancelar(cita: Cita): void {
    this.citaService.cancelarCita(cita.idCita).subscribe({
      next: () => {
        this.cargarCitas();
        this.messageService.add({
          severity: 'success',
          summary: 'Cita cancelada',
          detail: 'Tu cita fue cancelada correctamente',
          life: 3000,
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'No se pudo cancelar',
          detail: 'Intenta de nuevo',
          life: 3000,
        });
      },
    });
  }

  nombresServicios(cita: Cita): string {
    return cita.servicios.map((s) => s.nombre).join(', ');
  }

  claseEstado(idEstado: number): string {
    switch (idEstado) {
      case 4: return 'bg-yellow-100 text-yellow-800';
      case 5: return 'bg-green-100 text-green-800';
      case 6: return 'bg-blue-100 text-blue-800';
      default: return 'bg-red-100 text-red-800';
    }
  }

  // ---------- Foto de perfil (localStorage) ----------

  private leerFoto(): string | null {
    try {
      return localStorage.getItem(AVATAR_KEY);
    } catch {
      return null;
    }
  }

  alElegirFoto(event: Event): void {
    const input = event.target as HTMLInputElement;
    const archivo = input.files?.[0];
    if (!archivo) return;

    if (!archivo.type.startsWith('image/')) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Archivo no válido',
        detail: 'Elige una imagen (JPG, PNG, etc.)',
        life: 3000,
      });
      input.value = '';
      return;
    }

    if (archivo.size > 2 * 1024 * 1024) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Imagen muy grande',
        detail: 'La imagen no puede superar 2 MB',
        life: 3000,
      });
      input.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = String(reader.result);
      this.foto.set(base64);
      try {
        localStorage.setItem(AVATAR_KEY, base64);
      } catch {
        this.messageService.add({
          severity: 'warn',
          summary: 'No se pudo guardar la foto',
          detail: 'La imagen es muy grande para tu navegador',
          life: 3000,
        });
      }
    };
    reader.readAsDataURL(archivo);
    input.value = '';
  }

  quitarFoto(): void {
    this.foto.set(null);
    try {
      localStorage.removeItem(AVATAR_KEY);
    } catch {}
  }

  // ---------- Utilidades de vista ----------

  setSeccion(seccion: Seccion): void {
    this.seccion.set(seccion);
  }

  iniciales(): string {
    const p = this.perfil();
    if (!p) return '?';
    return (p.nombres?.charAt(0) ?? '') + (p.apellidos?.charAt(0) ?? '');
  }

  currencyFormat(valor: number): string {
    return `$${valor.toLocaleString('es-CO')}`;
  }

  agendar(): void {
    this.router.navigate(['/schedule']);
  }

  irAlLogin(): void {
    this.router.navigate(['/login']);
  }

  cerrarSesion(): void {
    this.session.cerrarSesion();
  }
}
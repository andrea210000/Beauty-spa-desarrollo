import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Servicio, ServicioService } from '../../services/servicio.service';
import { Cita, CitaService } from '../../services/cita.service';

@Component({
  selector: 'app-schedule-component',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatDatepickerModule, ToastModule],
  providers: [provideNativeDateAdapter(), MessageService],
  templateUrl: './schedule-component.html',
  styleUrls: ['./schedule-component.css'],
})
export class ScheduleComponent implements OnInit {
  private servicioService = inject(ServicioService);
  private citaService = inject(CitaService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private messageService = inject(MessageService);

  // Datos desde la API
  servicios = signal<Servicio[]>([]);
  misCitas = signal<Cita[]>([]);
  cargando = signal(false);
  enviando = signal(false);

  // Formulario
  selectedDate: Date | null = null;
  selectedTime: string = '';
  selectedServicioIds: number[] = [];
  notas: string = '';

  // Controla si el usuario no está logueado
  sinSesion = signal(false);

  ngOnInit(): void {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      this.sinSesion.set(true);
      this.messageService.add({
        severity: 'info',
        summary: 'Inicia sesión',
        detail: 'Debes iniciar sesión para agendar una cita',
        life: 3000,
      });
      setTimeout(() => this.router.navigate(['/login']), 1500);
      return;
    }

    this.cargarServicios();
    this.cargarMisCitas();

    // Si llegamos desde la página de servicios (/schedule?servicio=9),
    // marcamos ese servicio en el formulario.
    this.route.queryParams.subscribe((params) => {
      const id = Number(params['servicio']);
      if (id && !this.selectedServicioIds.includes(id)) {
        this.selectedServicioIds.push(id);
      }
    });
  }

  cargarServicios(): void {
    this.cargando.set(true);
    this.servicioService.obtenerServicios().subscribe({
      next: (data) => this.servicios.set(data),
      error: (err) => {
        console.error('Error al cargar servicios', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los servicios',
          life: 4000,
        });
      },
      complete: () => this.cargando.set(false),
    });
  }

  cargarMisCitas(): void {
    this.citaService.misCitas().subscribe({
      next: (data) => this.misCitas.set(data),
      error: (err) => console.error('Error al cargar mis citas', err),
    });
  }

  // Alterna la selección de un servicio (checkbox)
  toggleServicio(id: number): void {
    const i = this.selectedServicioIds.indexOf(id);
    if (i === -1) this.selectedServicioIds.push(id);
    else this.selectedServicioIds.splice(i, 1);
  }

  estaSeleccionado(id: number): boolean {
    return this.selectedServicioIds.includes(id);
  }

  get totalSeleccionado(): number {
    return this.servicios()
      .filter((s) => this.selectedServicioIds.includes(s.idServicios))
      .reduce((acc, s) => acc + s.costo, 0);
  }

  get duracionTotal(): number {
    return this.servicios()
      .filter((s) => this.selectedServicioIds.includes(s.idServicios))
      .reduce((acc, s) => acc + s.duracionMinutos, 0);
  }

  agendar(): void {
    // Validaciones
    if (!this.selectedDate) {
      this.messageService.add({ severity: 'warn', summary: 'Falta la fecha', detail: 'Selecciona un día en el calendario', life: 3000 });
      return;
    }
    if (!this.selectedTime) {
      this.messageService.add({ severity: 'warn', summary: 'Falta la hora', detail: 'Selecciona una hora', life: 3000 });
      return;
    }
    if (this.selectedServicioIds.length === 0) {
      this.messageService.add({ severity: 'warn', summary: 'Sin servicios', detail: 'Elige al menos un servicio', life: 3000 });
      return;
    }

    // Combinamos fecha + hora en un string LOCAL (sin zona horaria "Z")
    // para que la API y MySQL lo reciban tal cual como hora local.
    const fecha = new Date(this.selectedDate);
    const [h, m] = this.selectedTime.split(':').map(Number);
    fecha.setHours(h, m, 0, 0);

    if (fecha.getTime() < Date.now()) {
      this.messageService.add({ severity: 'warn', summary: 'Fecha inválida', detail: 'La cita debe ser en el futuro', life: 3000 });
      return;
    }

    const pad = (n: number) => n.toString().padStart(2, '0');
    const fechaHora = `${fecha.getFullYear()}-${pad(fecha.getMonth() + 1)}-${pad(fecha.getDate())}T${pad(fecha.getHours())}:${pad(fecha.getMinutes())}:00`;

    this.enviando.set(true);
    this.citaService
      .crearCita({ fechaHora, idServicios: [...this.selectedServicioIds], notas: this.notas || null })
      .subscribe({
        next: (res) => {
          this.messageService.add({ severity: 'success', summary: '¡Cita agendada!', detail: `N° ${res.idCita} registrada. Te esperamos.`, life: 4000 });
          this.limpiarFormulario();
          this.cargarMisCitas();
        },
        error: (err) => {
          console.error('Error al agendar', err);
          this.messageService.add({
            severity: 'error',
            summary: 'No se pudo agendar',
            detail: err?.error?.mensaje ?? 'Error inesperado',
            life: 4000,
          });
        },
        complete: () => this.enviando.set(false),
      });
  }

  cancelar(cita: Cita): void {
    this.citaService.cancelarCita(cita.idCita).subscribe({
      next: () => {
        this.messageService.add({ severity: 'info', summary: 'Cita cancelada', detail: 'Tu cita fue cancelada', life: 3000 });
        this.cargarMisCitas();
      },
      error: (err) => {
        console.error('Error al cancelar', err);
        this.messageService.add({ severity: 'error', summary: 'No se pudo cancelar', detail: 'Intenta de nuevo', life: 3000 });
      },
    });
  }

  limpiarFormulario(): void {
    this.selectedDate = null;
    this.selectedTime = '';
    this.selectedServicioIds = [];
    this.notas = '';
  }

  // Helpers para la vista
  getFechaCita(iso: string): string {
    return new Date(iso).toLocaleDateString('es-CO', { weekday: 'long', day: '2-digit', month: 'long' });
  }

  getHoraCita(iso: string): string {
    return new Date(iso).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
  }

  // Une los nombres de los servicios de la cita: "Manicure, Pedicure"
  getNombresCita(cita: Cita): string {
    return (cita.servicios ?? []).map((s) => s.nombre).join(', ');
  }

  puedeCancelar(cita: Cita): boolean {
    return cita.idEstado === 4 || cita.idEstado === 5; // PENDIENTE o CONFIRMADA
  }
}
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Authservice } from '../../services/authservice';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register-component',
  imports: [CommonModule, FormsModule, ToastModule],
  providers: [MessageService],
  templateUrl: './register-component.html',
  styleUrl: './register-component.css',
})
export class RegisterComponent {

  private router = inject(Router);
  private authservice = inject(Authservice);
  private messageService = inject(MessageService);

  mostrarPassword: boolean = false;

  nombres: string = '';
  apellidos: string = '';
  correo: string = '';
  telefono: string = '';
  tipoIdentificacion: number = 2;
  numeroIdentificacion: string = '';
  contrasena: string = '';

  tiposIdentificacion = [
    { value: 1, label: 'TI' },
    { value: 2, label: 'CC' },
    { value: 3, label: 'CE' },
  ];

  toggleMostrar() {
    this.mostrarPassword = !this.mostrarPassword;
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  onSubmit() {
    const data = {
      Nombres: this.nombres,
      Apellidos: this.apellidos,
      Correo: this.correo,
      Telefono: this.telefono,
      IdTipoIdentificacion: this.tipoIdentificacion,
      NumeroIdentificacion: this.numeroIdentificacion,
      Contrasena: this.contrasena,
      IdRol: 4,
      IdEstado: 1
    };

    this.authservice.register(data).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Registro exitoso', detail: 'Cliente y usuario registrados correctamente.', life: 3000 });
        setTimeout(() => this.router.navigate(['/login']), 1200);
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error al registrar', detail: 'Ocurrió un error al registrar. Verifica los datos e intenta de nuevo.', life: 4000 });
      }
    });

  }

}

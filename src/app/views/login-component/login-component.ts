import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { Authservice } from '../../services/authservice';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login-component',
  imports: [CommonModule, FormsModule, ToastModule],
  providers: [MessageService],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {

  private router = inject(Router);
  private authservice = inject(Authservice);
  private messageService = inject(MessageService);

  mostrarPassword: boolean = false;

  toggleMostrar() {
    this.mostrarPassword = !this.mostrarPassword;
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  recordarSesion: boolean = false;

  usuario: string = '';
  contrasena: string = '';

  onSubmit() {
    const data= {
      Usuario: this.usuario,
      Contrasena: this.contrasena
    };

    this.authservice.Login(data).subscribe({
      next: (res: any) => {
        this.messageService.add({ severity: 'success', summary: 'Inicio de sesión exitoso', detail: 'Bienvenido de nuevo al santuario', life: 3000 });
        localStorage.setItem('accessToken', res.accessToken);
        setTimeout(() => this.router.navigate(['/home']), 1200);
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Credenciales incorrectas', detail: 'Verifica tu usuario y contraseña', life: 4000 });
      }
    })
  }

}

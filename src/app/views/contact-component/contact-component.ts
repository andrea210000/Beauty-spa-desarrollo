import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-contact-component',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastModule],
  providers: [MessageService],
  templateUrl: './contact-component.html',
  styleUrl: './contact-component.css',
})
export class ContactComponent {

  private messageService = inject(MessageService);

  form = { nombre: '', email: '', mensaje: '' };

  enviarMensaje(): void {
    if (!this.form.nombre.trim() || !this.form.email.trim() || !this.form.mensaje.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Campos incompletos',
        detail: 'Escribe tu nombre, correo y mensaje',
        life: 3000,
      });
      return;
    }

    if (!this.form.email.includes('@')) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Correo inválido',
        detail: 'Escribe un correo con @ (ejemplo: correo@gmail.com)',
        life: 3000,
      });
      return;
    }

    // Abre la aplicación de correo del usuario con el mensaje ya escrito
    const asunto = encodeURIComponent(`Mensaje de ${this.form.nombre} (sitio Beauty Spa)`);
    const cuerpo = encodeURIComponent(
      `${this.form.mensaje}\n\n---\nDe: ${this.form.nombre}\nCorreo: ${this.form.email}`
    );
    window.location.href = `mailto:contacto@beautyspa.com?subject=${asunto}&body=${cuerpo}`;

    this.messageService.add({
      severity: 'success',
      summary: 'Abriendo tu correo',
      detail: 'Revisa tu aplicación de correo para enviar el mensaje',
      life: 4000,
    });

    this.form = { nombre: '', email: '', mensaje: '' };
  }

  instagramUrl = 'https://www.instagram.com/projectbeautyspa081/';
}
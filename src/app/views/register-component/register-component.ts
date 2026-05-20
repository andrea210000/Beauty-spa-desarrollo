import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './register-component.html',
  styleUrl: './register-component.css',
})
export class RegisterComponent {

  constructor(private router: Router) {}

  mostrarPassword: boolean = false;
  recordarSesion: boolean = false;

  toggleMostrar() {
    this.mostrarPassword = !this.mostrarPassword;
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

}

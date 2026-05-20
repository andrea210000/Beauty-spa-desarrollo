import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-login-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {

  constructor(private router: Router) {}

  mostrarPassword: boolean = false;

  toggleMostrar() {
    this.mostrarPassword = !this.mostrarPassword;
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  recordarSesion: boolean = false;

}

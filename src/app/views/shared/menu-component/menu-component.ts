import { Component } from '@angular/core';
import { routes } from '../../../app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-component',
  imports: [],
  templateUrl: './menu-component.html',
  styleUrl: './menu-component.css',
})
export class MenuComponent {
  constructor(private router: Router) { }
  test(): void {
    console.log("hola");
  }
}


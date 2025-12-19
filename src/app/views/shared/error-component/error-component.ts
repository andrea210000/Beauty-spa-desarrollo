import { Component } from '@angular/core';
import { routes } from '../../../app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-component',
  imports: [],
  templateUrl: './error-component.html',
  styleUrl: './error-component.css',
})
export class ErrorComponent {
  constructor(private router: Router) { }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

}

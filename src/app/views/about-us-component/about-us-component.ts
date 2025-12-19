import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-us-component',
  imports: [],
  templateUrl: './about-us-component.html',
  styleUrl: './about-us-component.css',
})
export class AboutUsComponent {
  constructor(private router: Router) {}
  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

}

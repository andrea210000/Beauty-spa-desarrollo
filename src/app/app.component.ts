import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './views/shared/menu-component/menu-component';
import { FooterComponent } from './views/shared/footer-component/footer-component';
import { PrivacyPoliciesComponent } from './views/privacy-policies-component/privacy-policies-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent, FooterComponent, PrivacyPoliciesComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  protected readonly title = signal('beauty-spa');
}



import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './views/shared/menu-component/menu-component';
import { ScheduleComponent } from './views/schedule-component/schedule-component';
import { FooterComponent } from './views/shared/footer-component/footer-component';
import { AboutUsComponent } from './views/about-us-component/about-us-component';
import { ErrorComponent } from './views/shared/error-component/error-component';
import { LocationComponent } from './views/location-component/location-component';
import { ContactComponent } from './views/contact-component/contact-component';
import { CounterComponent } from './views/shared/counter-component/counter-component';
import { PaymentComponent } from './views/payment-component/payment-component';
import { ServicesComponent } from './views/services-component/services-component';
import { OurProductsComponent } from './views/our-products-component/our-products-component';
import { LoginComponent } from './views/login-component/login-component'; 
import { RegisterComponent } from './views/register-component/register-component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MenuComponent,
    ScheduleComponent,
    FooterComponent,
    AboutUsComponent,
    ErrorComponent,
    LocationComponent,
    ContactComponent,
    CounterComponent,
    PaymentComponent,
    ServicesComponent,
    OurProductsComponent,
    LoginComponent,
    RegisterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  protected readonly title = signal('beauty-spa');
}



import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './views/shared/menu-component/menu-component';
import { ScheduleComponent } from './views/schedule-component/schedule-component';
import { FooterComponent} from './views/shared/footer-component/footer-component';
import {AboutUsComponent } from './views/about-us-component/about-us-component'
import {ErrorComponent} from './views/shared/error-component/error-component';
import {LocationComponent} from './views/location-component/location-component';
import {ContactComponent} from './views/contact-component/contact-component';
import {CounterComponent} from './views/shared/counter-component/counter-component';
import {PaymentComponent} from './views/payment-component/payment-component';
import {ServicesComponent} from './views/services-component/services-component';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent, ScheduleComponent, FooterComponent, AboutUsComponent, ErrorComponent, LocationComponent, ContactComponent, CounterComponent, PaymentComponent,ServicesComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('beauyt-spa');

}

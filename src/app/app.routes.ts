import { Routes } from '@angular/router';
import { HomeComponent } from './views/home-component/home-component';
import { ErrorComponent } from './views/shared/error-component/error-component';
import { LocationComponent } from './views/location-component/location-component';
import {AboutUsComponent } from './views/about-us-component/about-us-component';
import {ScheduleComponent } from './views/schedule-component/schedule-component';
import {ContactComponent} from './views/contact-component/contact-component';
import {PaymentComponent} from './views/payment-component/payment-component';
import {ServicesComponent} from './views/services-component/services-component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'location', component: LocationComponent},
  { path: 'about-us', component: AboutUsComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', component: ErrorComponent },
  
];

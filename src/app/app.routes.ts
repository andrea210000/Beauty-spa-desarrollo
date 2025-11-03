import { Routes } from '@angular/router';
import { HomeComponent } from '../app/views/home-component/home-component';


export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

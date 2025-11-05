import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './views/shared/menu-component/menu-component';
import { ScheduleComponent } from './views/shared/schedule-component/schedule-component';
import { FooterComponent} from './views/shared/footer-component/footer-component';
import {AboutUsComponent } from './views/shared/about-us-component/about-us-component'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent, ScheduleComponent, FooterComponent, AboutUsComponent ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('beauyt-spa');
}

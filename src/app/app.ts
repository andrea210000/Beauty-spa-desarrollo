import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './views/shared/menu-component/menu-component';
import { ScheduleComponent } from './views/shared/schedule-component/schedule-component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent, ScheduleComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('beauyt-spa');
}

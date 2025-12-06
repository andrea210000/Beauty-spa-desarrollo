import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { A11yModule, CdkAriaLive } from "@angular/cdk/a11y";
import {MatTimepickerModule} from '@angular/material/timepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-schedule-component',
  standalone: true,
  imports: [MatCardModule, MatDatepickerModule, DatePipe, MatFormFieldModule, MatInputModule, MatTimepickerModule, A11yModule, CdkAriaLive],
  providers: [provideNativeDateAdapter(),],
  templateUrl: './schedule-component.html',
  styleUrls: ['./schedule-component.css'],

})
export class ScheduleComponent {
  selectedDate: Date | null = null;
}

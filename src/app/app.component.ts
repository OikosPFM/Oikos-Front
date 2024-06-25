import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/layout/header/navbar/navbar.component';
import { FooterLayoutComponent } from './components/layout/footer/homeFooter/footer.component';
import { HeaderLayoutComponent } from './components/layout/header/header.component';
import { ContactComponent } from './components/pages/contactUs/contacta.component';
import { AboutComponent } from './components/pages/aboutUs/about.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CalendarComponent } from './calendar/calendar.component';
import { FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterLayoutComponent,
    HeaderLayoutComponent,
    ContactComponent,
    AboutComponent,
    HttpClientModule,
    MatIconModule,
    CommonModule
  , CalendarComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {
  title = 'Oikos';
}


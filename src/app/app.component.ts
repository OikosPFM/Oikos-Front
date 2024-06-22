import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/layout/header/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
<<<<<<< HEAD
import { HeaderLayoutComponent } from './components/layout/header/header.component';
import { FooterLayoutComponent } from './components/layout/footer/homeFooter/footer.component';
import { ContactComponent } from './components/pages/contactUs/contacta.component';
import { AboutComponent } from './components/pages/aboutUs/about.component';
=======
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
>>>>>>> 585ca89205bd556b2f421bdd3971e895f4484076

@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< HEAD
=======
  imports: [RouterOutlet, NavbarComponent, HttpClientModule, CommonModule, MatIconModule],
>>>>>>> 585ca89205bd556b2f421bdd3971e895f4484076
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    RouterOutlet,
    NavbarComponent,
    HttpClientModule,
    HeaderLayoutComponent,
    FooterLayoutComponent,
  ],
})
export class AppComponent {
  title = 'Oikos';
}

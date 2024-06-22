import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/layout/header/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderLayoutComponent } from './components/layout/header/header.component';
import { FooterLayoutComponent } from './components/layout/footer/homeFooter/footer.component';
import { ContactComponent } from './components/pages/contactUs/contacta.component';
import { AboutComponent } from './components/pages/aboutUs/about.component';

@Component({
  selector: 'app-root',
  standalone: true,
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

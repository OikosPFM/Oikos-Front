import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-layout-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [NavbarComponent],
})
export class HeaderLayoutComponent {
  title: string = 'OIKOS';
}

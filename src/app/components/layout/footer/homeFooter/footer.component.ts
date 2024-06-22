import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterLayoutComponent {
  isHome: () => boolean = () => {
    if (window.location.pathname === '/') {
      return true;
    }
    return false;
  };
}

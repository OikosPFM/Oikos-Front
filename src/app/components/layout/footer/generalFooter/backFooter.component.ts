import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-backFooter',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './backFooter.component.html',
  styleUrl: './backFooter.component.css',
})
export class BackFooterComponent {
  isHome: () => boolean = () => {
    if (window.location.pathname === '/') {
      return true;
    }
    return false;
  };
}

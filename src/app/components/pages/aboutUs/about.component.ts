import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../layout/header/navbar/navbar.component';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  imports: [NavbarComponent, CommonModule, RouterModule],
})
export class AboutComponent {
  aboutUs: string = ''; // Initialize with empty string;
}

import { Component } from '@angular/core';
import { FormComponent } from '../../layout/main/form/form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}

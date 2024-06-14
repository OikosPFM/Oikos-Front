import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../layout/header/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { BackFooterComponent } from '../../layout/footer/generalFooter/backFooter.component';
import { HeaderLayoutComponent } from '../../layout/header/header.component'; // Import FormsModule
import { EmailFormComponent } from './email-form/email-form.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contacta.component.html',
  styleUrl: './contacta.component.css',
  imports: [
    NavbarComponent,
    CommonModule,
    RouterModule,
    FormsModule,
    BackFooterComponent,
    HeaderLayoutComponent,
    EmailFormComponent,
  ],
})
export class ContactComponent {
  userEmail: string = ''; // Initialize with empty string;
  emailFormComponent: any;

  onSubmit() {
    // Implementa la lógica para enviar el correo electrónico
    // usando un servicio de correo electrónico
    console.log('Enviar correo electrónico a:', this.userEmail);
  }
}
/*@NgModule({
  declarations: [ContactComponent],
  imports: [FormsModule], // Add FormsModule to imports array
  exports: [ContactComponent],
})
export class ContactModule {}*/

import { Component, NgModule } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NavbarComponent } from '../../layout/header/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [FormsModule, NavbarComponent, CommonModule],
  templateUrl: './contacta.component.html',
  styleUrls: ['./contacta.component.css'],
})
export class ContactComponent {
  contact = {
    email: '',
    subject: '',
    message: '',
  };

  statusMessage: string = '';
  statusClass: string = '';

  constructor() {}

  sendEmail(contactForm: NgForm) {
    if (!this.contact.email || !this.contact.subject || !this.contact.message) {
      this.statusMessage = 'Por favor, complete todos los campos';
      this.statusClass = 'error';
      return;
    }

    const emailParams = {
      from_email: this.contact.email,
      subject: this.contact.subject,
      message: this.contact.message,
    };

    emailjs
      .send(
        'service_2panvmv',
        'template_ksj2jdn',
        emailParams,
        'UhyukkugcUewQ8rQv'
      )
      .then(
        (result: EmailJSResponseStatus) => {
          this.statusMessage = 'Su email ha sido enviado correctamente.';
          this.statusClass = 'success';
          console.log(result.text);
          contactForm.reset();
        },

        (error) => {
          this.statusMessage =
            'Ha habido un error al enviar el email, inténtelo de nuevo.';
          this.statusClass = 'error';
          console.error(error.text);
        }
      );
  }
}

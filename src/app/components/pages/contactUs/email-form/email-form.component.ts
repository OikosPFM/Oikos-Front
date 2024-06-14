/*import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-email-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './email-form.component.html',
  styleUrl: './email-form.component.css',
})
export class EmailFormComponent implements OnInit {
  message: string = '';
  emailFormComponent: FormsModule = '';
  http: any;

    constructor(private email: EmailFormComponent) {}
    sendEmail(emailForm: NgForm): void {
    }

  /*constructor(private fb: FormBuilder) {
    this.emailFormComponent = this.fb.group({
      message: [''],
    });


  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSubmit(emailForm:NgForm) {
    const formData = this.emailFormComponent;
    const message = formData.message;
    console.log(this.emailFormComponent);

    // Implementar la lógica para enviar el correo electrónico aquí
    // Ejemplo usando el servicio HttpClient:

    this.http
      .post('http://localhost:8081/api/v1/enviar-correo', { message })
      .subscribe(
        (response: string) => {
          // Manejar la respuesta del servidor (éxito o error)
          console.log('Correo enviado correctamente');
        },
        (error: string) => {
          console.error('Error al enviar el correo electrónico:', error);
        }
      );
  }
}
*/

import { Component, Injectable } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmailService } from '../../../../services/email.service';

@Injectable({
  // Add @Injectable to enable dependency injection
  providedIn: 'root', // Assuming this service is a root-level service
})
@Component({
  selector: 'app-email',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './email-form.component.html',
  styleUrl: './email-form.component.css',
})
export class EmailFormComponent {
  sendEmail(arg0: any) {
    throw new Error('Method not implemented.');
  }
  message: string = '';

  emailForm: any;

  constructor(private emailService: EmailService) {} // Inject EmailService

  sendEmailToRecipient() {
    const recipientEmail = 'oikospfm@gmail.com';
    const messageContent = 'Este es el contenido del correo electrónico.';

    this.emailService.sendEmail(recipientEmail, messageContent).subscribe(
      (response: any) => {
        console.log('Email enviado satisfactoriamente:', response);
      },
      (error: any) => {
        console.error('Error al enviar su consulta:', error);
      }
    );
  }
}

import { Component, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from '../../../../services/email.service';

@Injectable({
  providedIn: 'root', // Assuming this service is a root-level service
})
@Component({
  selector: 'app-email',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css'],
})
export class EmailFormComponent {
  emailForm: FormGroup;

  constructor(private emailService: EmailService, private fb: FormBuilder) {
    this.emailForm = this.fb.group({
      recipientEmail: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  sendEmail() {
    if (this.emailForm.invalid) {
      return; // Prevent sending if form is invalid
    }

    const recipientEmail = this.emailForm.value.recipientEmail;
    const subject = this.emailForm.value.subject;
    const messageContent = this.emailForm.value.message;

    this.emailService.sendEmail(recipientEmail, messageContent)
      .subscribe(
        (response: any) => {
          console.log('Email enviado satisfactoriamente:', response);
          this.emailForm.reset(); // Reset form after successful send
        },
        (error: any) => {
          console.error('Error al enviar su consulta:', error);
        }
      );
  }
}

/*constructor(private emailService: EmailService) {}
  sendEmail(emailForm: NgForm): void {
    if (emailForm.invalid) {
      alert('Por favor, redacte su consulta en el cuadro de texto');
      return;
    }
    this.emailService.sendEmail(this.message).subscribe({
      next: (data) => {
        console.log('Mensaje enviado correctamente', data);
        alert(`¡Gracias por su consulta, le responderemos en breve!`);
        emailForm.resetForm();
      },

      error: (error) => {
        console.error('Ha habido un error al enviar su consulta', error);
      },
    });
  }
}*/

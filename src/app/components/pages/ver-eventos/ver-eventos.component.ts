import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { ContactsService } from '../../../services/api-agenda/contacts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ver-eventos',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './ver-eventos.component.html',
  styleUrl: './ver-eventos.component.css'
})
export class VerEventosComponent {
  eventos: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private contactsService: ContactsService
  ) {}
  ngOnInit(): void {
    //Leer de la query la clave id usando los métodos de Angular.
    const idQuery = this.route.snapshot.queryParamMap.get('idQuery');
    console.log('idQuery: ', idQuery);
    const id = this.route.snapshot.paramMap.get('id');
    console.log('ID: ', id);
    this.loadEventos();
  }
  loadEventos(): void {
    this.contactsService.getContacts().subscribe({
      next: (data: any) => {
        this.eventos = data.data;
        console.log('Eventos: ', this.eventos);
      },
      error: (error: any) => {
        console.error('Hubo un error al ver los eventos: ', error);
      },
    });
  }
  onRefreshClick(): void {
    this.loadEventos();
  }
}


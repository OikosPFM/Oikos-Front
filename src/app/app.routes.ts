import { Routes } from '@angular/router';
import { EntradaForoComponent } from './components/pages/foro/entrada-foro/entrada-foro.component';
import { RespuestaForoComponent } from './components/pages/foro/respuesta-foro/respuesta-foro.component';

export const routes: Routes = [
    {
        path:'entrada-foro',
        component: EntradaForoComponent,
    },
    {
        path: 'respuesta-foro',
        component: RespuestaForoComponent,
    },
];

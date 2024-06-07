import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { FincasService } from '../../../../services/fincas/fincas.service';
import { PropiedadesService } from '../../../../services/propiedades/propiedades.service';
import { UsuariosService } from '../../../../services/usuarios/usuarios.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatRadioModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  providers: [FincasService, PropiedadesService, UsuariosService],
})
export class FormComponent {
  constructor(
    private _formBuilder: FormBuilder,
    private fincasService: FincasService,
    private propiedadesService: PropiedadesService,
    private UsuariosService: UsuariosService
  ) {}
  fincaFormGroup = this._formBuilder.group({
    selectedFinca: ['', Validators.required],
  });
  domicilioFormGroup = this._formBuilder.group({
    portal: ['', Validators.required],
    numeroPiso: ['', Validators.required],
    letra: ['', Validators.required],
  });
  usuarioFormGroup = this._formBuilder.group({
    nombre: ['', Validators.required],
    primerApellido: ['', Validators.required],
    segundoApellido: ['', Validators.required],
    dni: ['', Validators.required],
    telefono: ['', Validators.required],
    email: ['', Validators.required],
    contraseña: ['', Validators.required],
  });
  fincas: any[] = [];

  ngOnInit(): void {
    this.getFincas();
  }

  getFincas(): void {
    this.fincasService.getAllFincas().subscribe(
      (data) => {
        this.fincas = data;
      },
      (error) => {
        console.error('Error al obtener las fincas', error);
      }
    );
  }

  onSubmit(): void {
    if (
      this.fincaFormGroup.valid &&
      this.domicilioFormGroup.valid &&
      this.usuarioFormGroup.valid
    ) {
      const propiedadData = {
        finca: {
          idFinca: this.fincaFormGroup.value.selectedFinca,
        },
        portal: this.domicilioFormGroup.value.portal,
        numeroPiso: this.domicilioFormGroup.value.numeroPiso,
        letra: this.domicilioFormGroup.value.letra,
      };

      const usuarioData = {
        nombre: this.usuarioFormGroup.value.nombre,
        propiedad: {
          idPropiedad: '',
        },
        primerApellido: this.usuarioFormGroup.value.primerApellido,
        segundoApellido: this.usuarioFormGroup.value.segundoApellido,
        dni: this.usuarioFormGroup.value.dni,
        telefono: this.usuarioFormGroup.value.telefono,
        email: this.usuarioFormGroup.value.email,
        contraseña: this.usuarioFormGroup.value.contraseña,
      };
      console.log('Propiedad Data:', propiedadData);
      console.log('Usuario Data:', usuarioData);
      this.propiedadesService.createPropiedad(propiedadData).subscribe(
        (response) => {
          // Manejar la respuesta exitosa del servidor
          console.log('Propiedad creada exitosamente:', response);
          usuarioData.propiedad.idPropiedad = response.idPropiedad;
          this.UsuariosService.createUsuario(usuarioData).subscribe(
            (response) => {
              // Manejar la respuesta exitosa del servidor
              console.log('Usuario creado exitosamente:', response);
            },
            (error) => {
              console.error('Error al crear el usuario', error);
            }
          );
          // Aquí puedes realizar acciones adicionales si es necesario
        },
        (error) => {
          console.error('Error al obtener las fincas', error);
        }
      );
    }
  }
}

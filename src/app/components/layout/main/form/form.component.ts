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
import { AuthService } from '../../../../services/auth/auth.service';

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
  providers: [FincasService, PropiedadesService, UsuariosService, AuthService],
})
export class FormComponent {
  constructor(
    private _formBuilder: FormBuilder,
    private fincasService: FincasService,
    private propiedadesService: PropiedadesService,
    private UsuariosService: UsuariosService,
    private authService: AuthService
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
    dni: ['', [Validators.required, Validators.pattern(/^\d{8}[A-Z]$/)]],
    telefono: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    contraseña: ['', Validators.required],
  });
  fincas: any[] = [];
  errorMessages: string[] = [];

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
      !this.domicilioFieldsEmpty(this.domicilioFormGroup) &&
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
      console.log(propiedadData);
      // Llamar al servicio de propiedades para crear o recuperar la propiedad
      this.propiedadesService.buscarOCrearPropiedad(propiedadData).subscribe(
        (propiedad) => {
          console.log('Propiedad creada/recuperada:', propiedad);

          const usuarioData = {
            nombre: this.usuarioFormGroup.value.nombre,
            primerApellido: this.usuarioFormGroup.value.primerApellido,
            segundoApellido: this.usuarioFormGroup.value.segundoApellido,
            dni: this.usuarioFormGroup.value.dni,
            telefono: this.usuarioFormGroup.value.telefono,
            email: this.usuarioFormGroup.value.email,
            contraseña: this.usuarioFormGroup.value.contraseña,
            rol: 'USER',
            propiedad: {
              idPropiedad: propiedad.idPropiedad, // Aquí se usa el ID de la propiedad creada/recuperada
            },
          };
          console.log(usuarioData);

          // Llamar al servicio de autenticación para registrar el usuario
          this.authService.registerUsuario(usuarioData).subscribe(
            (response) => {
              console.log('Usuario registrado exitosamente:', response);
              // Manejar la respuesta del servidor si es necesario
              alert(
                `Registro completado, espera a que el administrador apruebe el registro para acceder.`
              );
            },
            (error) => {
              if (error.status === 409) {
                console.log('El correo ya está en uso.');
                this.errorMessages.push(
                  'El correo con el que estas intentando registrarte ya está en uso.'
                );
              } else {
                console.error('Error al registrar el usuario:', error);
                // Manejar otros errores si es necesario
              }
            }
          );
        },
        (error) => {
          console.error('Error al crear/recuperar la propiedad:', error);
          // Manejar el error si es necesario
        }
      );
    } else {
      this.markAllAsTouched();
    }
  }

  markAllAsTouched() {
    this.fincaFormGroup.markAllAsTouched();
    this.domicilioFormGroup.markAllAsTouched();
    this.usuarioFormGroup.markAllAsTouched();
  }

  domicilioFieldsEmpty(group: FormGroup): boolean {
    const portal = group.get('portal')?.value;
    const numeroPiso = group.get('numeroPiso')?.value;
    const letra = group.get('letra')?.value;

    return !portal && !numeroPiso && !letra;
  }

  usuarioFieldsEmpty(group: FormGroup): boolean {
    const nombre = group.get('nombre')?.value;
    const primerApellido = group.get('primerApellido')?.value;
    const segundoApellido = group.get('segundoApellido')?.value;
    const dni = group.get('dni')?.value;
    const telefono = group.get('telefono')?.value;
    const email = group.get('email')?.value;
    const contraseña = group.get('contraseña')?.value;

    // Check if all user fields are filled using logical AND (&&)
    return !(
      nombre &&
      primerApellido &&
      segundoApellido &&
      dni &&
      telefono &&
      email &&
      contraseña
    );
  }

  get mensajeErrorDNI() {
    const dniControl = this.usuarioFormGroup.get('dni');
    if (dniControl?.hasError('pattern') && dniControl?.touched) {
      this.errorMessages.push(
        'El formato de DNI no es valido debe tener 8 digitos y una letra'
      );
    }
    return '';
  }
}

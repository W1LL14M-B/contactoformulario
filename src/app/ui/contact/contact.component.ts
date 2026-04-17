import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SendContactUseCase } from '../../application/use-cases/send-contact.usecase';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { edadMinimaValidator } from '../../shared/edad.validator';
import { ContactService } from '../../infrastructure/services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private sendContact = inject(SendContactUseCase);
  public estaEnFoco: boolean = false;
  private contactService = inject(ContactService);

  ngOnInit() {
    this.form.get('pais')?.valueChanges.subscribe((pais) => {
      const departamentoCtrl = this.form.get('departamento');

      if (pais === 'Colombia') {
        // 👇 activar validación
        departamentoCtrl?.setValidators([Validators.required]);
      } else {
        // 👇 limpiar si no es Colombia
        departamentoCtrl?.clearValidators();
        departamentoCtrl?.setValue('');
      }

      departamentoCtrl?.updateValueAndValidity();
    });
  }

  manejarBlur(event: any): void {
    this.estaEnFoco = false;
    const input = event.target;
    if (!input.value) {
      input.type = 'text';
    }
  }

  manejarFocus(event: any): void {
    this.estaEnFoco = true;
    event.target.type = 'date';
  }

  form = this.fb.nonNullable.group({
    sexo: ['', Validators.required],
    fechaNacimiento: ['', [Validators.required, edadMinimaValidator(18)]],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    direccion: ['', Validators.required],
    ciudad: ['', Validators.required],
    pais: ['', Validators.required],
    comentarios: ['', Validators.required],
    casa: [''],
    departamento: ['', Validators.required],
  });

  /*  async submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    await this.sendContact.execute(value);

    // Navegar a tabla enviando datos
    this.router.navigate(['/tabla'], {
      state: { data: [value] },
    });

    this.form.reset();
  } */

  /*     async submit() {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  const value = this.form.getRawValue();

  try {
    // 👇 1. Ejecuta tu caso de uso (hexagonal)
    await this.sendContact.execute(value);

    // 👇 2. Consumir API
    this.contactService.getContacts().subscribe((data) => {

      // 👇 3. Unificar datos (API + nuevo registro)
      const nuevaData = [
        ...data,
        {
          id: data.length + 1,
          ...value
        }
      ];

      // 👇 4. Navegar con toda la data
      this.router.navigate(['/tabla'], {
        state: { data: nuevaData }
      });

      this.form.reset();
    });

  } catch (error) {
    console.error('Error al enviar contacto', error);
  }
}
 */

  async submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.getRawValue();

    this.contactService.getContacts().subscribe((apiData) => {
      // 👇 Normalizar el dato del formulario (MISMA estructura que API)
      const nuevoRegistro = {
        id: apiData.length + 1,
        sexo: formValue.sexo,
        fechaNacimiento: formValue.fechaNacimiento,
        nombre: formValue.nombre,
        apellido: formValue.apellido,
        email: formValue.email,
        direccion: formValue.direccion,
        ciudad: formValue.ciudad,
        departamento: formValue.departamento,
        pais: formValue.pais,
        comentarios: formValue.comentarios,
      };

      // 👇 Unir API + formulario
      const dataFinal = [...apiData, nuevoRegistro];

      console.log('DATA FINAL:', dataFinal); // 👈 DEBUG

      // 👇 navegar con TODO
      this.router.navigate(['/tabla'], {
        state: { data: dataFinal },
      });

      this.form.reset();
    });
  }
}

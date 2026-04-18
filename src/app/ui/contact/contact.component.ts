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


  blockNumbers(event: KeyboardEvent) {
  // Si la tecla es un número, se cancela
  if (/[0-9]/.test(event.key)) {
    event.preventDefault();
  }
}


    async submit() {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  const formValue = this.form.getRawValue();

  this.router.navigate(['/tabla'], {
    state: { nuevoContacto: formValue }
  });

  this.form.reset();
}
}

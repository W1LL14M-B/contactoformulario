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

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  private sendContact = inject(SendContactUseCase);

  form = this.fb.nonNullable.group({
    sexo: ['', Validators.required],
    fechaNacimiento: ['', Validators.required],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    direccion: ['', Validators.required],
    ciudad: ['', Validators.required],
    pais: ['', Validators.required],
    comentarios: [''],
      casa: [''],
  departamento: [''],
  });

  async submit() {
    if (this.form.invalid) return;

    const value = this.form.getRawValue();
    await this.sendContact.execute(value);

    this.form.reset();
  }
}

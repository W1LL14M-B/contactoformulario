import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function edadMinimaValidator(edadMinima: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    const hoy = new Date();
    const nacimiento = new Date(control.value);

    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }

    return edad < edadMinima ? { menorEdad: true } : null;
  };
}

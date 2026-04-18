import { ContactService } from './../../infrastructure/services/contact.service';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-table',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, FormsModule],
  templateUrl: './contact-table.component.html',
})
export class ContactTableComponent implements OnInit {
  private contactService = inject(ContactService);
  private router = inject(Router);

  data: any[] = [];
  filteredData: any[] = [];
  searchTerm: string = '';
  selectedItem: any = null;
  sortOrder: { [key: string]: boolean } = {};

  constructor() {}



/* ngOnInit() {

    const nav = history.state;
    const nuevoDesdeFormulario = nav.nuevoContacto;


    this.contactService.getContacts().subscribe({
      next: (datosJson) => {

        if (nuevoDesdeFormulario) {

          const registroNuevo = {
            ...nuevoDesdeFormulario,
            id: datosJson.length + 1
          };

          this.data = [registroNuevo, ...datosJson];
        } else {
          this.data = [...datosJson];
        }


        this.filteredData = [...this.data];
        console.log('Tabla unificada con éxito:', this.data);
      },
      error: (err) => console.error('Error al cargar contactos', err)
    });
  }
 */

  ngOnInit() {
  const nav = history.state;
  const nuevoDesdeFormulario = nav.nuevoContacto;

  this.contactService.getContacts().subscribe({
    next: (datosJson) => {
      // 1. Intentar cargar datos previamente guardados en LocalStorage
      const datosGuardados = localStorage.getItem('mis_contactos');

      if (datosGuardados) {
        // Si existen, usamos los de LocalStorage
        this.data = JSON.parse(datosGuardados);
      } else {
        // Si no hay nada guardado, inicializamos con la lógica anterior
        if (nuevoDesdeFormulario) {
          const registroNuevo = {
            ...nuevoDesdeFormulario,
            id: datosJson.length + 1
          };
          this.data = [registroNuevo, ...datosJson];
        } else {
          this.data = [...datosJson];
        }
        // Guardamos esta primera carga para futuras ediciones
        this.actualizarLocalStorage();
      }

      // Si entramos con un contacto nuevo del formulario pero YA había datos en LocalStorage,
      // lo añadimos al arreglo existente para no perderlo.
      if (nuevoDesdeFormulario && datosGuardados) {
        const existe = this.data.some(c => c.email === nuevoDesdeFormulario.email);
        if (!existe) {
          const registroNuevo = { ...nuevoDesdeFormulario, id: this.data.length + 1 };
          this.data = [registroNuevo, ...this.data];
          this.actualizarLocalStorage();
        }
      }

      this.filteredData = [...this.data];
    },
    error: (err) => console.error('Error al cargar contactos', err)
  });
}

filter(): void {
  const term = this.searchTerm.toLowerCase().trim();
  if (!term) {
    this.filteredData = [...this.data];
  } else {
    this.filteredData = this.data.filter(
      (item) =>
        item.nombre?.toLowerCase().includes(term) ||
        item.apellido?.toLowerCase().includes(term) ||
        item.email?.toLowerCase().includes(term) ||
        item.ciudad?.toLowerCase().includes(term) ||
        item.departamento?.toLowerCase().includes(term) || // Nuevo en filtro
        item.comentarios?.toLowerCase().includes(term)    // Nuevo en filtro
    );
  }
}


  sort(key: string) {
    this.sortOrder[key] = !this.sortOrder[key];
    this.filteredData.sort((a, b) => {
      const valA = (a[key] || '').toString().toLowerCase();
      const valB = (b[key] || '').toString().toLowerCase();
      return this.sortOrder[key]
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    });
  }


  openEditModal(item: any) {
    this.selectedItem = { ...item };
  }

  saveEdit() {

    const index = this.data.findIndex(
      (i) =>
        i.id === this.selectedItem.id && i.email === this.selectedItem.email,
    );

    if (index !== -1) {
      this.data[index] = this.selectedItem;

      // 👇 PERSISTENCIA: Guardamos el array completo actualizado
    this.actualizarLocalStorage();


      this.filter();
      this.selectedItem = null;
    }
  }

// --- 1. Definir la función de persistencia ---
private actualizarLocalStorage(): void {
  localStorage.setItem('mis_contactos', JSON.stringify(this.data));
}

  limpiarPersistencia() {
  localStorage.removeItem('mis_contactos');
  location.reload(); // Recarga para traer los datos limpios del servicio
}


  volver() {
    this.router.navigate(['/']);
  }
}

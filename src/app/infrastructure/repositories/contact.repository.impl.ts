import { Injectable } from '@angular/core';
import { ContactRepository } from '../../domain/ports/contact.repository';
import { Contact } from '../../domain/models/contact.model';

@Injectable({ providedIn: 'root' })
export class ContactRepositoryImpl extends ContactRepository {

  async send(contact: Contact): Promise<void> {
    console.log("Enviando contacto:", contact);
    // aquí luego conectas con backend
  }
}

import { Injectable } from '@angular/core';
import { ContactRepository } from '../../domain/ports/contact.repository';
import { Contact } from '../../domain/models/contact.model';

@Injectable({ providedIn: 'root' })
export class SendContactUseCase {

  constructor(private repo: ContactRepository) {}

  execute(contact: Contact): Promise<void> {
    return this.repo.send(contact);
  }
}

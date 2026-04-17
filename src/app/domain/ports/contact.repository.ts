import { Contact } from "../models/contact.model";

export abstract class ContactRepository {
  abstract send(contact: Contact): Promise<void>;
}

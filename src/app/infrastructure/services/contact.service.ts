import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private url = 'https://cincoveinticinco.com/users.json';

  constructor(private http: HttpClient) {}

  getContacts(): Observable<any[]> {
    return this.http.get<any>(this.url).pipe(
      map(res => res.users.map((u: any) => ({
        id: u.id,
        sexo: u.sex,
        fechaNacimiento: u.date_birthday,
        nombre: u.name,
        apellido: u.last_name,
        email: u.email,
        direccion: u.addres,
        ciudad: u.City,
        departamento: u.Deparment,
        pais: u.country,
        comentarios: u.comment
      })))
    );
  }
}

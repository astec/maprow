import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersonModel } from './person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private httpClient: HttpClient){}

  getAll(): Observable<PersonModel[]>
  {
    return this.httpClient.get<PersonModel[]>(this.serverUrl);
  }

  getById(id: number): Observable<PersonModel>
  {
    return this.httpClient.get<PersonModel>(this.serverUrl + '/id/' + id);
  }

  getByName(name: String): Observable<PersonModel>
  {
    return this.httpClient.get<PersonModel>(this.serverUrl + '/name/' + name);
  }

  private serverUrl = 'http://localhost:8081/person';
}

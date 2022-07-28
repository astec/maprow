import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../interface/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private httpClient: HttpClient){}

  getAll(): Observable<Person[]>
  {
    return this.httpClient.get<Person[]>(this.serverUrl);
  }

  getById(id: number): Observable<Person>
  {
    return this.httpClient.get<Person>(this.serverUrl + '/id/' + id);
  }

  getByName(name: String): Observable<Person>
  {
    return this.httpClient.get<Person>(this.serverUrl + '/name/' + name);
  }

  private serverUrl = 'http://localhost:8081/person';
}

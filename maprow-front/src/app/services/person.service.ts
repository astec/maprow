import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersonModel } from '../shared/person.model';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class PersonService {
	constructor(private httpClient: HttpClient) {}

	getAll(): Observable<PersonModel[]> {
			return this.httpClient.get<PersonModel[]>(`${this.serverUrl}/all`);

	}

	getById(id: number): Observable<PersonModel> {
		return this.httpClient.get<PersonModel>(`${this.serverUrl}/${id}`);
	}

	getByName(name: string): Observable<PersonModel> {
		return this.httpClient.get<PersonModel>(`${this.serverUrl}?name=${name}`);
	}

	private serverUrl = `${environment.applicationServerUrl}/person`;
}

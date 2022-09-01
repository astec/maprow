import { Component, OnInit } from '@angular/core';

import { PersonModel } from '../../shared/person.model';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
})
export class PersonComponent implements OnInit {
  private people: PersonModel[] = [];

  constructor(private personService: PersonService) {}

  ngOnInit(): void {
    this.setPeople();
  }

  getPeople(): PersonModel[] {
    return this.people;
  }

  private setPeople(): void {
    this.personService.getAll().subscribe((response: PersonModel[]) => {
      this.people = response;
    });
  }
}

import { Component, OnInit } from '@angular/core';

import { PersonModel } from './person.model';
import { PersonService } from './person.service';

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

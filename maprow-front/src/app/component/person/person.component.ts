import { Component, OnInit } from '@angular/core';

import { Person } from 'src/app/interface/person';
import { PersonService } from 'src/app/service/person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit
{
  constructor(private personService: PersonService){}

  ngOnInit(): void
  {
    this.setPeople();
  }

  private setPeople(): void
  {
    this.personService.getAll().subscribe
    (
      (response: Person[]) =>
      {
        this.people = response;
      }
    )
  }

  getPeople(): Person[]
  {
    return this.people;
  }

  private people: Person[] = [];
}

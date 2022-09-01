import { Component } from '@angular/core';

interface Language {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  selectedValue!: string;
  
  languages: Language[] = [
    {value: 'pl-0', viewValue: 'PL'},
    {value: 'en-1', viewValue: 'EN'},
    {value: 'de-2', viewValue: 'DE'}
  ]

}

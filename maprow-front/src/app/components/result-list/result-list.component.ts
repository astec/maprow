import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NominatimResponse } from '../../shared/nominatim-response.model';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.css']
})
export class ResultListComponent {
  @Input() results!: NominatimResponse[];
  @Output() locationSelected = new EventEmitter();

  selectResult(result: NominatimResponse) {
    this.locationSelected.emit(result);
  }
}

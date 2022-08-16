import { Component, Input } from '@angular/core';
import { MapPoint } from '../shared/map-point.model';

@Component({
  selector: 'app-map-point-form',
  templateUrl: './map-point-form.component.html',
  styleUrls: ['./map-point-form.component.css'],
})
export class MapPointFormComponent {
  @Input() mapPoint!: MapPoint;

}

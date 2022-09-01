import { Component, EventEmitter, Output } from '@angular/core';
import { NominatimService } from '../../services/nominatim.service';
import { NominatimResponse } from '../../shared/nominatim-response.model';
import { Map, CircleMarker } from 'leaflet';

@Component({
  selector: 'app-geocoding',
  templateUrl: './geocoding.component.html',
  styleUrls: ['./geocoding.component.css']
})
export class GeocodingComponent {
  map!: Map;
  @Output() onSearch = new EventEmitter();
  searchResults!: NominatimResponse[];

  constructor(private nominatimService: NominatimService) {}

  addressLookup(address: string) {
    if (address.length > 3) {
      this.nominatimService.addressLookup(address).subscribe((results) => {
        this.searchResults = results;
      });
    } else {
      this.searchResults = [];
    }
    this.onSearch.emit(this.searchResults);
  }

  public findLocation(map: Map) {
    let markerCurrentLocation;
    map.locate();

    map.on('locationfound', function (e) {
      markerCurrentLocation = new CircleMarker(e.latlng).addTo(map);
      map.setView(e.latlng, 16);
    })
  }

  
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { iconDefault } from '../app.constants'



@Injectable({
  providedIn: 'root',
})
export class StationsService {
  stations: string = 'assets/data/ZG-bikeStations.geojson';
  markers: any = L.markerClusterGroup({disableClusteringAtZoom: 13});

  constructor(private http: HttpClient) {}

  makeStationsMarkers(map: L.Map): void {
    L.Marker.prototype.options.icon = iconDefault;
    this.http.get(this.stations).subscribe((res: any) => {
      for (const c of res.features) {
        const lat = c.geometry.coordinates[0];
        const lon = c.geometry.coordinates[1];
        this.markers.addLayer(
          L.marker([lat, lon], { icon: iconDefault }).addTo(map)
        );
      }
    });

    map.addLayer(this.markers);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';


@Injectable({
  providedIn: 'root',
})
export class BRouteService {
  geo: string  = 'assets/data/special_routes/jedrzychow-campus-A.geojson';

  constructor(private http: HttpClient) {}

  makeBikeRoutes(map: L.Map): void {
    this.http.get(this.geo).subscribe((res: any) => {
        L.geoJSON(res, {
            onEachFeature: function (feature, layer) {
                var popupMessage = feature.properties.name + "<br>" +
                 "Długość w km:" + feature.properties.length_in_km + "<br>" +
                  feature.properties.image;
                layer.bindPopup(popupMessage);
            },
         }).addTo(map);
    });
  }
}
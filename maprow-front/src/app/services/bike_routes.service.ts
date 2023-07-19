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
                layer.bindPopup(feature.properties.name);
            }
         }).addTo(map);
    });

  }
}

import { Component, OnInit } from '@angular/core';
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from '../app.constants';
import { MapPoint } from '../shared/map-point.model';
import { NominatimResponse } from '../shared/nominatim-response.model';
import { Watermark } from './watermark';
import { Legend } from './legend';
import { StationsService } from '../services/stations.service';

import {
  icon,
  latLng,
  LeafletMouseEvent,
  Map,
  marker,
  MapOptions,
  tileLayer,
  MarkerClusterGroup,
} from 'leaflet';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  map!: Map;
  mapPoint!: MapPoint;
  options!: MapOptions;
  lastLayer: any;
  markerClusterGroup!: MarkerClusterGroup;
  markerClusterData = [];
  results!: NominatimResponse[];

  constructor(private stationsService: StationsService) { }



  ngOnInit() {
    this.initializeDefaultMapPoint();
    this.initializeMapOptions();
  }



  initializeMap(map: Map) {
    this.map = map;
    this.createMarker();
    new Watermark({ position: 'topright' }).addTo(this.map);
    new Legend({ position: 'bottomleft' }).addTo(this.map);
    this.stationsService.makeStationsMarkers(this.map);
    this.markerClusterGroup = new MarkerClusterGroup({ removeOutsideVisibleBounds: true });


  }

  getAddress(result: NominatimResponse) {
    this.updateMapPoint(result.latitude, result.longitude, result.displayName);
    this.createMarker();
  }

  refreshSearchList(results: NominatimResponse[]) {
    this.results = results;
  }

  onMapClick(e: LeafletMouseEvent) {
    this.clearMap();
    this.updateMapPoint(e.latlng.lat, e.latlng.lng);
    this.createMarker();
  }

  private initializeMapOptions() {
    this.options = {
      zoom: 14,
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {

          maxZoom: 18,
          attribution: 'OSM',
        }),
      ],
    };
  }

  private initializeDefaultMapPoint() {
    this.mapPoint = {
      name: 'Welcome in Zielona Góra',
      latitude: DEFAULT_LATITUDE,
      longitude: DEFAULT_LONGITUDE,
    };
  }

  private updateMapPoint(latitude: number, longitude: number, name?: string) {
    this.mapPoint = {
      latitude: latitude,
      longitude: longitude,
      name: name ? name : this.mapPoint.name,
    };
  }

  private createMarker() {

    const mapIcon = icon({
      iconUrl: 'assets/marker-icon.png'
    });
    const coordinates = latLng([
      this.mapPoint.latitude,
      this.mapPoint.longitude,
    ]);
    this.map.setView(coordinates, this.map.getZoom());
    this.lastLayer = marker(coordinates).setIcon(mapIcon).addTo(this.map);

  }

  private getDefaultIcon() {
    return icon({
      iconSize: [40, 40],
      iconAnchor: [13, 41],
      iconUrl: 'assets/city-bike.png'
    });
  }

  private clearMap() {
    if (this.map.hasLayer(this.lastLayer)) this.map.removeLayer(this.lastLayer);
  }
}

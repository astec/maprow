import { Component, OnInit, Input } from '@angular/core';
import {
  DEFAULT_LATITUDE,
  DEFAULT_LONGITUDE,
  OSM,
  cartoDBDark,
  OCM
} from '../../app.constants';
import { MapPoint } from '../../shared/map-point.model';
import { NominatimResponse } from '../../shared/nominatim-response.model';
import { Watermark } from './watermark';
import { StationsService } from '../../services/stations.service';
import * as L from 'leaflet';
import 'leaflet-routing-machine';

import {
  icon,
  latLng,
  control,
  Control,
  LeafletMouseEvent,
  Map,
  marker,
  MapOptions,
  MarkerClusterGroup,
} from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  @Input() map!: Map;
  mapPoint!: MapPoint;
  options!: MapOptions;
  lastLayer: any;
  markerClusterGroup!: MarkerClusterGroup;
  markerClusterData = [];
  results!: NominatimResponse[];

  private clickedOnMap: boolean = false;

  public locateOptions: Control.LocateOptions = {
    flyTo: false,
    keepCurrentZoomLevel: true,
    locateOptions: {
      enableHighAccuracy: true,
    },
    icon: 'material-icons md-18 target icon',
    clickBehavior: { inView: 'stop', outOfView: 'setView', inViewNotFollowing: 'setView' },
  };

  constructor(private stationsService: StationsService) {}

  ngOnInit() {
    this.initializeDefaultMapPoint();
    this.initializeMapOptions();
  }

  initializeMap(map: Map) {
    this.map = map;
    this.Routing();
    this.createMarker();
    this.initializeLayers();
    new Watermark({ position: 'topright' }).addTo(this.map);
    this.stationsService.makeStationsMarkers(this.map);
    this.markerClusterGroup = new MarkerClusterGroup({ removeOutsideVisibleBounds: true });
  }

  Routing() {
    let routingControl = L.Routing.control({
      waypoints: [
        L.latLng(51.93590676661108, 15.506719869834797),
        L.latLng(51.935683219376585, 15.5057454331818)
      ],
      routeWhileDragging: true,
      showAlternatives: true
    }).addTo(this.map);

    this.map.on('click', (e) => {
      const clickedLatLng = e.latlng;
      const waypoint: L.Routing.Waypoint = {
        latLng: clickedLatLng,
      };

      routingControl.spliceWaypoints(routingControl.getWaypoints().length - 1, 0, waypoint);
    });
  }

  getAddress(result: NominatimResponse) {
    this.updateMapPoint(result.latitude, result.longitude, result.displayName);
    this.createMarker();
    if (this.clickedOnMap) {
      this.addWaypointToRoute(result.latitude, result.longitude);
      this.drawRoute();
    }
    this.clickedOnMap = false;
  }

  refreshSearchList(results: NominatimResponse[]) {
    this.results = results;
  }

  onMapClick(e: LeafletMouseEvent) {
    this.clearMap();
    this.updateMapPoint(e.latlng.lat, e.latlng.lng);
    this.clickedOnMap = true;
  }

  initializeLayers() {
    var baseLayers = {
      'OpenStreet Map': OSM,
      'CartoDB Dark': cartoDBDark,
      CycleOSM: OCM,
    };
    var overlayMaps = {};
    var bikecycle_zg = L.tileLayer.wms("http://localhost:8080/geoserver/bikecycle_zg/wms", {
      layers: 'bikecycle_zg:bikecycle',
      format: 'image/png',
      transparent: true
    }).addTo(this.map);
    var controlLayers = control.layers(baseLayers, overlayMaps).addTo(this.map);
  }

  private initializeMapOptions() {
    this.options = {
      zoom: 14,
      minZoom: 10,
      layers: [OSM],
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
      iconUrl: 'assets/images/icons/marker-icon.png',
    });
    const coordinates = latLng([this.mapPoint.latitude, this.mapPoint.longitude]);
    this.map.setView(coordinates, this.map.getZoom());
    this.lastLayer = marker(coordinates).setIcon(mapIcon).addTo(this.map);
  }

  private addWaypointToRoute(latitude: number, longitude: number) {
    let routingControl: any = null;
    this.map.eachLayer((layer: any) => {
      if (layer instanceof L.Routing.Control) {
        routingControl = layer;
        return;
      }
    });

    if (!routingControl) {

      routingControl = L.Routing.control({
        routeWhileDragging: true,
        showAlternatives: true,
      }).addTo(this.map);
    }

    const waypoint: L.Routing.Waypoint = {
      latLng: L.latLng(latitude, longitude),
    };
    routingControl.spliceWaypoints(routingControl.getWaypoints().length - 1, 0, waypoint);
  }

  private drawRoute() {
    let routingControl: any = null;
    this.map.eachLayer((layer: any) => {
      if (layer instanceof L.Routing.Control) {
        routingControl = layer;
        return;
      }
    });

    if (routingControl) {
      routingControl.getRouter().route(routingControl.getWaypoints(), (err: any, routes: any) => {
        if (!err) {
          routingControl.getPlan().setWaypoints(routes[0].waypoints);
        }
      });
    }
  }

  private clearMap() {
    if (this.map.hasLayer(this.lastLayer)) this.map.removeLayer(this.lastLayer);
  }
}

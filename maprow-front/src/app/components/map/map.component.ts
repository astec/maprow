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
import * as geojson from 'geojson';
import { HttpClient } from '@angular/common/http';

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
import { geoJSON } from 'src/assets/lib/leaflet-1-8-0/leaflet-src';

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
	// miniMap!: any;

	public locateOptions: Control.LocateOptions = {
		flyTo: false,
		keepCurrentZoomLevel: true,
		locateOptions: {
			enableHighAccuracy: true,
		},
		icon: 'material-icons md-18 target icon',
		clickBehavior: { inView: 'stop', outOfView: 'setView', inViewNotFollowing: 'setView' },
	};

	constructor(private stationsService: StationsService, private http: HttpClient) {}

	ngOnInit() {
		this.initializeDefaultMapPoint();
		this.initializeMapOptions();
	}
	

	initializeMap(map: Map) {
		
		this.map = map;
		this.createMarker();
		this.initializeLayers();
		new Watermark({ position: 'topright' }).addTo(this.map);
		this.stationsService.makeStationsMarkers(this.map);
		this.markerClusterGroup = new MarkerClusterGroup({ removeOutsideVisibleBounds: true });
		var geo  = 'assets/data/routes.geojson';
		this.http.get(geo).subscribe((res: any) => {
			var data = res;
			L.geoJSON(data).addTo(map);
		});
			
		// this.miniMap = require('leaflet-minimap');
		// this.miniMap = new Minimap(this.lastLayer, {zoom: 14}).addTo(this.map);
	}

	getAddress(result: NominatimResponse) {
		this.clearMap();
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

	initializeLayers() {
		var baseLayers = {
			'OpenStreet Map': OSM,
			'CartoDB Dark': cartoDBDark,
			CycleOSM: OCM,
		};
		var overlayMaps = {};
		/*
		var bikecycle_zg = L.tileLayer.wms("http://localhost:8080/geoserver/temp/wms", {
    layers: 'temp:temp',
    format: 'image/png',
    transparent: true
}).addTo(this.map); */

		var controlLayers = control.layers(baseLayers, overlayMaps).addTo(this.map);
	}

	private initializeMapOptions() {
		this.options = {
			zoom: 14,
      minZoom: 3,
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

	private getDefaultIcon() {
		return icon({
			iconSize: [40, 40],
			iconAnchor: [13, 41],
			iconUrl: 'assets/images/icons/city-bike.png',
		});
	}

	private clearMap() {
		if (this.map.hasLayer(this.lastLayer)) this.map.removeLayer(this.lastLayer);
	}
	
}

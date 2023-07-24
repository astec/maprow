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
import * as $ from 'jquery';

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

	constructor(private stationsService: StationsService) {}

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
		// this.miniMap = require('leaflet-minimap');
		// this.miniMap = new Minimap(this.lastLayer, {zoom: 14}).addTo(this.map);
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
		// this.updateMapPoint(e.latlng.lat, e.latlng.lng);
		this.createMarker();
	}

	initializeLayers() {
		var baseLayers = {
			'OpenStreet Map': OSM,
			'CartoDB Dark': cartoDBDark,
			CycleOSM: OCM,
		};
		var overlayMaps = {};

		var bikecycle_zg = L.tileLayer.wms("http://localhost:8080/geoserver/TRASA/wms?service=WMS", {
            layers: 'TRASA:FILE',
            format: 'image/png',
            transparent: true

}).addTo(this.map);

$.ajax(
    'http://localhost:8080/geoserver/TRASA:FILE/ows?',
    {
    type: 'GET',
    data: {
            service: 'WFS',
            request: 'GetFeature',
            typename: 'TRASA:FILE',
            srsname: 'EPSG:4326',
            outputFormat: 'text/javascript'
    },

    dataType: 'jsonp',
    jsonpCallback: 'callback:handleJson',
    jsonp: 'format_options',

    });


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

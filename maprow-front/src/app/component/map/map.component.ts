import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import * as $ from 'jquery';
import { Watermark } from './watermark';
import { Legend } from './legend';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  protected map: any;
  static map: any;

  private initMap(): void {
		this.map = L.map('map', {
			center: [51.937, 15.5044],
			zoom: 14,
		});

		const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			minZoom: 12,
			attribution: '© OpenStreetMap',
		});

		tiles.addTo(this.map);
		new Watermark({ position: 'topright' }).addTo(this.map);
		new Legend({ position: 'topright' }).addTo(this.map);

		const icon = L.icon({
			iconUrl: '../assets/city-bike.png',
			iconSize: [40, 40],
    });
    
		// markers of bike-stations - source: https://zielonogorskirowermiejski.pl/mapa-stacji/

		L.marker([51.933368, 15.47696], { icon }).addTo(this.map); // Francuska/Dunikowskiego
		L.marker([51.952502, 15.48514], { icon }).addTo(this.map); // Zjednoczenia/Dekoracyjna
		L.marker([51.925131, 15.514117], { icon }).addTo(this.map); // Nowa/Browarna
		L.marker([51.905833, 15.507264], { icon }).addTo(this.map); // Nowojędrzychowska / Makowa
		L.marker([51.943366, 15.509078], { icon }).addTo(this.map); // Plac Bohaterów
		L.marker([51.978576, 15.486797], { icon }).addTo(this.map); // Odrzańska (Łężyca)
		L.marker([51.958425, 15.496729], { icon }).addTo(this.map); // Batorego/Zamoyskiego
		L.marker([51.945175, 15.52091], { icon }).addTo(this.map); // Wyspiańskiego (pływalnia)
		L.marker([51.946735, 15.510964], { icon }).addTo(this.map); // Dworcowa (dworzec PKS)
		L.marker([51.947139, 15.513638], { icon }).addTo(this.map); // Dworcowa (dworzec PKP)
		L.marker([51.969102, 15.534448], { icon }).addTo(this.map); // Krępowska (Chynów)
		L.marker([51.956863, 15.523532], { icon }).addTo(this.map); // Sulechowska (CRS)
		L.marker([51.935897, 15.506481], { icon }).addTo(this.map); // Konstytucji 3 Maja (Wenus)
		L.marker([51.936806, 15.503058], { icon }).addTo(this.map); // Plac Słowiański
		L.marker([51.953189, 15.498984], { icon }).addTo(this.map); // Batorego/Obywatelska
		L.marker([51.933249, 15.498337], { icon }).addTo(this.map); // 1 Maja (Zielona Strzała)
		L.marker([51.929966, 15.492318], { icon }).addTo(this.map); // Wyszyńskiego/Wiśniowa
		L.marker([51.928661, 15.487514], { icon }).addTo(this.map); // Zawadzkiego/Cyryla i Metodego
		L.marker([51.931494, 15.485354], { icon }).addTo(this.map); // Wyszyńskiego/Monte Cassino
		L.marker([51.935456, 15.481439], { icon }).addTo(this.map); // Wyszyńskiego/Słowacka
		L.marker([51.93766, 15.488124], { icon }).addTo(this.map); // Krośnieńska (Zielona Strzała)
		L.marker([51.945975, 15.454651], { icon }).addTo(this.map); // Cisowa
		L.marker([51.920544, 15.5002], { icon }).addTo(this.map); // Botaniczna (Ogród botaniczny - Mini ZOO)
		L.marker([51.943944, 15.477801], { icon }).addTo(this.map); // Zacisze/Prosta
		L.marker([51.944455, 15.470365], { icon }).addTo(this.map); // Agrestowa
		L.marker([51.939154, 15.474271], { icon }).addTo(this.map); // Wojska Polskiego (UZ)
		L.marker([51.937964, 15.47705], { icon }).addTo(this.map); // Kraljevska
		L.marker([51.939282, 15.4823], { icon }).addTo(this.map); // Wojska Polskiego/Wyszyńskiego
		L.marker([51.931691, 15.516136], { icon }).addTo(this.map); // Morelowa
		L.marker([51.933619, 15.555892], { icon }).addTo(this.map); // Osiedle Śląskie
		L.marker([51.937489, 15.559479], { icon }).addTo(this.map); // Osiedle Pomorskie
		L.marker([51.942213, 15.528763], { icon }).addTo(this.map); // Szafrana (UZ)
		L.marker([51.93941, 15.528694], { icon }).addTo(this.map); // Podgórna (UZ)
		L.marker([51.939487, 15.524012], { icon }).addTo(this.map); // Podgórna/Waryńskiego
		L.marker([51.940114, 15.513041], { icon }).addTo(this.map); // Rondo 11 Listopada
		L.marker([51.939505, 15.502008], { icon }).addTo(this.map); // Wojska Polskiego/Reja
		L.marker([51.940938, 15.504489], { icon }).addTo(this.map); // Kupiecka/Wojska Polskiego
		L.marker([51.955939, 15.514996], { icon }).addTo(this.map); // Zdrojowa
		L.marker([51.940303, 15.506537], { icon }).addTo(this.map); // Kupiecka (Bachus)
		L.marker([51.937946, 15.504805], { icon }).addTo(this.map); // Stary Rynek/Jana Sobieskiego

		var wfs_url =
			'http://localhost:8080/geoserver/wfs?service=wfs&version=2.0.0&request=GetFeature&typeNames=topp:states&outputFormat=application/json';
		$.getJSON(wfs_url).then(response => {
			L.geoJSON(response).addTo(this.map);
		});
	}

  public static getMap() {
    return this.map;
  }

  ngAfterViewInit(): void {
    this.initMap();
    }


}

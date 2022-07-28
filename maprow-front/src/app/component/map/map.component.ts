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

  private map: any;

  private initMap(): void {
    this.map = L.map ('map', {
        center: [ 51.937, 15.5044 ],
        zoom: 14
      });

    const tiles = L.tileLayer (
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        minZoom: 3,
        attribution: '© OpenStreetMap',
      }
    )

    tiles.addTo(this.map);
    new Watermark({ position: 'topright' }).addTo(this.map);
    new Legend({ position: 'topright' }).addTo(this.map);

    var wfs_url = 'http://localhost:8080/geoserver/wfs?service=wfs&version=2.0.0&request=GetFeature&typeNames=topp:states&outputFormat=application/json';
    $.getJSON(wfs_url).then (
      (response) => {
        L.geoJSON(response).addTo(this.map)
      });
  }

  public getMap() {
    return this.map;
  }

   ngAfterViewInit(): void {
    this.initMap();
    }


}

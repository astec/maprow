import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import * as $ from 'jquery';
import { environment } from 'src/environments/environment';
import { geojsonMarkerOptions } from '../app.constants';



@Injectable({
    providedIn: 'root',
  })
  export class RouteService {

    constructor() {}

    makeLayer(workspace: string, geoLayer: string){
        let defaultParameters = {
            service : "WFS",
            version : "1.0.0",
            request : "GetFeature",
            typeName : workspace + ":" + geoLayer, 
            outputFormat : "application/json"
        };
        let parameters = L.Util.extend(defaultParameters);
        let urlRoot = environment.geoServerUrl + "/" + workspace + "/ows";
        let URL = urlRoot + L.Util.getParamString(parameters);
        let layer = L.featureGroup();
        let featureType = "";

        function style(feature:any){
            if(feature.properties.featureType){
                if(feature.properties.featureType.toLowerCase().includes("special route")) {return {color:"yellow"}; }
                else {return {color:"#03cffc"};}
            }
            else {return {color:"#03cffc"};} 
        }
​
        function getData(response: any){
            L.geoJSON(response, {
                onEachFeature: function (feature, layer) {
                    let popupContent = "<center>";
                    if(feature.properties.name) popupContent += feature.properties.name += "<br>";
                    if(feature.properties.length_in_km) popupContent += feature.properties.length_in_km + "<br>";
                    if(feature.properties.picture) popupContent += feature.properties.picture + "<br>";
                    if(feature.properties.featureType) {featureType = feature.properties.featureType}
                    popupContent += "</center>";
                    layer.bindPopup(popupContent);
                },
                pointToLayer: function(feature, latlng){
                    return L.circleMarker(latlng, geojsonMarkerOptions);
                },
                style:style,
            }).addTo(layer);
            if(featureType.toLowerCase().includes("special route")){
                layer.on("mouseover",function(e){layer.setStyle({color:"red"})});
                layer.on("mouseout",function(e){layer.setStyle({color:"yellow"})});
            }
        }

        $.ajax({
            url : URL,
            dataType : 'json',
            jsonpCallback : 'getJson',
            success : getData,
        });

        return layer;
    }
}
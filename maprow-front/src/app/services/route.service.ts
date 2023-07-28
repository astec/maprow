import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import * as $ from 'jquery';



@Injectable({
    providedIn: 'root',
  })
  export class RouteService {

    constructor() {}

    makeLayer(typName: string){
        //Creating URL
        var defaultParameters = {
            service : "WFS",
            version : "1.0.0",
            request : "GetFeature",
            typeName : typName,  //workspace:layer from geoserver
            outputFormat : "application/json"
        };
        var parameters = L.Util.extend(defaultParameters);
        var urlRoot = 'http://localhost:8080/geoserver/maprow/ows'; // /geoserver/workspace/ows
        var URL = urlRoot + L.Util.getParamString(parameters);
        var layer = L.featureGroup();

        //Function which converts jquery response to geojson layer
        function getData(response: any){
            L.geoJSON(response, {
                onEachFeature: function (feature, layer) {
                    layer.bindPopup(feature.properties.name);
                }
            }).addTo(layer);
        }

        //Connection to geoserver via jquery
        $.ajax({
            url : URL,
            dataType : 'json',
            jsonpCallback : 'getJson',
            success : getData,
            error : function(){
                console.log('error');
            },
            complete: function(response){
                console.log('complete')
            }
        });

        return layer;
    }

    makeCustomLayer(typName: string){
            //Creating URL
            var defaultParameters = {
                service : "WFS",
                version : "1.0.0",
                request : "GetFeature",
                typeName : typName,  //workspace:layer from geoserver
                outputFormat : "application/json"
            };
            var parameters = L.Util.extend(defaultParameters);
            var urlRoot = 'http://localhost:8080/geoserver/maprow/ows'; // /geoserver/workspace/ows
            var URL = urlRoot + L.Util.getParamString(parameters);
            var layer = L.featureGroup();

            //Function which converts jquery response to geojson layer
            function getData(response: any){
                L.geoJSON(response, {
                    onEachFeature: function (feature, layer) {
                        layer.bindPopup(feature.properties.name);
                    },
                    style:{
                        'color': '#000000'
                    }
                }).addTo(layer);
            }
            layer.on("mouseover",function(e){layer.setStyle({color:"white"})});
            layer.on("mouseout",function(e){layer.setStyle({color:"black"})});

            //Connection to geoserver via jquery
            $.ajax({
                url : URL,
                dataType : 'json',
                jsonpCallback : 'getJson',
                success : getData,
                error : function(){
                    console.log('error');
                },
                complete: function(response){
                    console.log('complete')
                }
            });

            return layer;
        }
}
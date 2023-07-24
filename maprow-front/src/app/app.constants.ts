import * as L from 'leaflet';

export const DEFAULT_LATITUDE = 51.937;
export const DEFAULT_LONGITUDE = 15.5044;

export const BASE_NOMINATIM_URL: string = 'nominatim.openstreetmap.org';
export const DEFAULT_VIEW_BOX: string = 'viewbox=-25.0000%2C70.0000%2C50.0000%2C40.0000';

//default setting for icons

const iconRetinaUrl = '../assets/images/icons/city-bike.png';
const iconUrl = '../assets/images/icons/city-bike.png';
const shadowUrl = '../assets/images/icons/marker-shadow.png';

export const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [40, 40],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

// List of map tilelayers

const mAttr = '';

const osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
export const OSM = L.tileLayer(osmUrl, {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
});

const ocmUrl = 'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png';
export const OCM = L.tileLayer(ocmUrl, {
  attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases">CyclOSM</a>'
});

const cartoDBDarkUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
export const cartoDBDark = L.tileLayer(cartoDBDarkUrl, {
  attribution: '<a href="https://carto.com/attributions">CARTO</a>'
});

export const geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};
import * as L from 'leaflet';

export const DEFAULT_LATITUDE = 51.937;
export const DEFAULT_LONGITUDE = 15.5044;

export const BASE_NOMINATIM_URL: string = 'nominatim.openstreetmap.org';
export const DEFAULT_VIEW_BOX: string = 'viewbox=-25.0000%2C70.0000%2C50.0000%2C40.0000';

const iconRetinaUrl = '../assets/city-bike.png';
const iconUrl = '../assets/city-bike.png';
const shadowUrl = '../assets/marker-shadow.png';

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



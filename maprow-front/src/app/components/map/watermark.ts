import * as L from 'leaflet';

export class Watermark extends L.Control {
  constructor(options?: L.ControlOptions) {
    super(options);
  }

  override onAdd(_map: L.Map) {
    let img = L.DomUtil.create('img');
    img.src = '../assets/images/logo_2.png';
    img.style.width = '150px';
    return img;
  }
}

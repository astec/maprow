import * as L from 'leaflet';

export class Legend extends L.Control {

  override onAdd(_map: L.Map) {
    var container = L.DomUtil.create('div', '.legend');

    container.style.padding = '6px 8px';
    container.style.font = '12px Arial, Helvetica, sans-serif';
    container.style.background = 'rgba(255, 255, 255, 0.8)';
    container.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.2)';
    container.style.borderRadius = '5px';
    container.style.color = '#555';
    container.style.lineHeight = '24px';

    container.innerHTML +=
      '<span style="bottom: 3px; font-weight: bold; color: orangered">Długość trasy: 34 km </span>';
    container.innerHTML += '<button type="button" class="btn btn-info" style = "border-radius: 50%; width: 18px; height: 18px; padding: 0; margin: 1px;" value="submit"> <img src="../assets/down-arrow.png" style = "width: 10px; height: 10px" < /button><br>';

        container.innerHTML += '<h6 *ngIf="show" style="text-align: center; font-size: 16px; margin: 2px 12 px 8px; color: #777">Legenda</h6>';
        container.innerHTML += '<i style="background-color: #477AC2; width: 18px; height: 18px; float: left; margin: 0 8px 0 0; opacity: 0.7;"></i><span style="position: relative; bottom: 3px;">Drogi miejskie</span><br>';
        container.innerHTML += '<i style="background-color: #448D40; width: 18px; height: 18px; float: left; margin: 0 8px 0 0; opacity: 0.7;"></i><span style="position: relative; bottom: 3px;">Drogi utwardzone</span><br>';
        container.innerHTML += '<i style="background-color: #E6E696; width: 18px; height: 18px; float: left; margin: 0 8px 0 0; opacity: 0.7;"></i><span style="position: relative; bottom: 3px;">Drogi nieutwardzone</span><br>';
        container.innerHTML += '<i style="background-color: #E8E6E0; width: 18px; height: 18px; float: left; margin: 0 8px 0 0; opacity: 0.7;"></i><span style="position: relative; bottom: 3px;">Szlaki rowerowe</span><br>';
        container.innerHTML += '<i style="background-color: #FFFFFF; width: 18px; height: 18px; float: left; margin: 0 8px 0 0; opacity: 0.7;"></i><span style="position: relative; bottom: 3px;">Stacja rowerów miejskich</span><br>';
        container.innerHTML +=
          '<i class="icon" style="background-color: pink; width: 18px; height: 18px; float: left; margin: 0 8px 0 0; opacity: 0.7;"></i><span></i><span>Grænse</span><br>';
        return container;

  }

  constructor(options?: L.ControlOptions) {
    super(options);
  }
}

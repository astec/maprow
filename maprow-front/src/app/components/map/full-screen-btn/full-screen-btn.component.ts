import { Component, OnDestroy, Input, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Map, Control, DomUtil, ControlPosition} from 'leaflet';

@Component({
	selector: 'app-full-screen-btn',
	templateUrl: './full-screen-btn.component.html',
	styleUrls: ['./full-screen-btn.component.css'],
})
export class FullScreenBtnComponent implements  OnDestroy {
	private _map!: Map;
	public custom!: Control;
	@Input() position!: ControlPosition;

	constructor(private http: HttpClient, private changeDetector: ChangeDetectorRef) {}

	ngOnDestroy() {
		this._map.removeControl(this.custom);
		this._map.off('click', this.onClick);
	}

	@Input() set map(map: Map) {
		if (map) {
			this._map = map;
			let Custom = Control.extend({
				onAdd(_map: Map) {
					return DomUtil.get('custom');
				}});
			this.custom = new Custom({
				position: this.position,
			}).addTo(map);
			map.on('click', this.onClick, this);
		}
	}
	get map(): Map {
		return this._map;
	}

	private onClick(e: any): void {
	}
}

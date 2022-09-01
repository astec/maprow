import { Component, OnDestroy, Input, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Map, Control, DomUtil, ControlPosition } from 'leaflet';

@Component({
	selector: 'app-map-sidebar',
	templateUrl: './map-sidebar.component.html',
	styleUrls: ['./map-sidebar.component.css'],
})
export class MapSidebarComponent implements OnDestroy {
	currentMap!: Map;
	showFiller = false;
	public custom!: Control;
	@Input() position!: ControlPosition;

	constructor(private http: HttpClient, private changeDetector: ChangeDetectorRef) {}

	ngOnDestroy() {
		this.currentMap.removeControl(this.custom);
		this.currentMap.off('click', this.onClick);
	}

	@Input() set map(map: Map) {
		if (map) {
			this.currentMap = map;
			let Custom = Control.extend({
				onAdd(currentMap: Map) {
					return DomUtil.get('custom');
				},
			});
			this.custom = new Custom({
				position: this.position,
			}).addTo(map);
			map.on('click', this.onClick, this);
		}
	}
	get map(): Map {
		return this.currentMap;
	}

	private onClick(e: any): void {}
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPointFormComponent } from './map-point-form.component';

describe('MapPointFormComponent', () => {
  let component: MapPointFormComponent;
  let fixture: ComponentFixture<MapPointFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapPointFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapPointFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

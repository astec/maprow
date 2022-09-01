import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullScreenBtnComponent } from './full-screen-btn.component';

describe('FullScreenBtnComponent', () => {
  let component: FullScreenBtnComponent;
  let fixture: ComponentFixture<FullScreenBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullScreenBtnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullScreenBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

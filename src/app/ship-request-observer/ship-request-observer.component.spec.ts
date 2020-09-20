import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipRequestObserverComponent } from './ship-request-observer.component';

describe('ShipRequestObserverComponent', () => {
  let component: ShipRequestObserverComponent;
  let fixture: ComponentFixture<ShipRequestObserverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipRequestObserverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipRequestObserverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

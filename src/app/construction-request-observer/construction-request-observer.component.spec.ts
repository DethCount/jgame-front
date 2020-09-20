import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructionRequestObserverComponent } from './construction-request-observer.component';

describe('ConstructionRequestObserverComponent', () => {
  let component: ConstructionRequestObserverComponent;
  let fixture: ComponentFixture<ConstructionRequestObserverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstructionRequestObserverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstructionRequestObserverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

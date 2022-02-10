import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassangerMapComponent } from './passanger-map.component';

describe('PassangerMapComponent', () => {
  let component: PassangerMapComponent;
  let fixture: ComponentFixture<PassangerMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassangerMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassangerMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

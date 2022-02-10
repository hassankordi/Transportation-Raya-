import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassMapComponent } from './pass-map.component';

describe('PassMapComponent', () => {
  let component: PassMapComponent;
  let fixture: ComponentFixture<PassMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

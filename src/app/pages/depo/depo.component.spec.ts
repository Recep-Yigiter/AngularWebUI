import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepoComponent } from './depo.component';

describe('DepoComponent', () => {
  let component: DepoComponent;
  let fixture: ComponentFixture<DepoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepoComponent]
    });
    fixture = TestBed.createComponent(DepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

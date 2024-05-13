import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepoSelectModalComponent } from './depo-select-modal.component';

describe('DepoSelectModalComponent', () => {
  let component: DepoSelectModalComponent;
  let fixture: ComponentFixture<DepoSelectModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepoSelectModalComponent]
    });
    fixture = TestBed.createComponent(DepoSelectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

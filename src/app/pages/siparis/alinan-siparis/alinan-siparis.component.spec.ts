import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlinanSiparisComponent } from './alinan-siparis.component';

describe('AlinanSiparisComponent', () => {
  let component: AlinanSiparisComponent;
  let fixture: ComponentFixture<AlinanSiparisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlinanSiparisComponent]
    });
    fixture = TestBed.createComponent(AlinanSiparisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

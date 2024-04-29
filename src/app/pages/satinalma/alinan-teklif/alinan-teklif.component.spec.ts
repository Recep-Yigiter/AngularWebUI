import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlinanTeklifComponent } from './alinan-teklif.component';

describe('AlinanTeklifComponent', () => {
  let component: AlinanTeklifComponent;
  let fixture: ComponentFixture<AlinanTeklifComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlinanTeklifComponent]
    });
    fixture = TestBed.createComponent(AlinanTeklifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

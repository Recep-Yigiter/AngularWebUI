import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlinanTeklifModalComponent } from './alinan-teklif-modal.component';

describe('AlinanTeklifModalComponent', () => {
  let component: AlinanTeklifModalComponent;
  let fixture: ComponentFixture<AlinanTeklifModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlinanTeklifModalComponent]
    });
    fixture = TestBed.createComponent(AlinanTeklifModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

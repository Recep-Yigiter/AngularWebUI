import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlinanTeklifHareketModalComponent } from './alinan-teklif-hareket-modal.component';

describe('AlinanTeklifHareketModalComponent', () => {
  let component: AlinanTeklifHareketModalComponent;
  let fixture: ComponentFixture<AlinanTeklifHareketModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlinanTeklifHareketModalComponent]
    });
    fixture = TestBed.createComponent(AlinanTeklifHareketModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

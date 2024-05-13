import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerilenTeklifHareketModalComponent } from './verilen-teklif-hareket-modal.component';

describe('VerilenTeklifHareketModalComponent', () => {
  let component: VerilenTeklifHareketModalComponent;
  let fixture: ComponentFixture<VerilenTeklifHareketModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerilenTeklifHareketModalComponent]
    });
    fixture = TestBed.createComponent(VerilenTeklifHareketModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

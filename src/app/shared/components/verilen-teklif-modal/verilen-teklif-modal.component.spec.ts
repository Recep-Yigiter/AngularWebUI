import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerilenTeklifModalComponent } from './verilen-teklif-modal.component';

describe('VerilenTeklifModalComponent', () => {
  let component: VerilenTeklifModalComponent;
  let fixture: ComponentFixture<VerilenTeklifModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerilenTeklifModalComponent]
    });
    fixture = TestBed.createComponent(VerilenTeklifModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

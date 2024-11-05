import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankadanTahsilKasaComponent } from './bankadan-tahsil-kasa.component';

describe('BankadanTahsilKasaComponent', () => {
  let component: BankadanTahsilKasaComponent;
  let fixture: ComponentFixture<BankadanTahsilKasaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BankadanTahsilKasaComponent]
    });
    fixture = TestBed.createComponent(BankadanTahsilKasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

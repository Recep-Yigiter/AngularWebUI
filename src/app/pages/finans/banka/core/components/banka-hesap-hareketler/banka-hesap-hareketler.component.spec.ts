import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankaHesapHareketlerComponent } from './banka-hesap-hareketler.component';

describe('BankaHesapHareketlerComponent', () => {
  let component: BankaHesapHareketlerComponent;
  let fixture: ComponentFixture<BankaHesapHareketlerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BankaHesapHareketlerComponent]
    });
    fixture = TestBed.createComponent(BankaHesapHareketlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

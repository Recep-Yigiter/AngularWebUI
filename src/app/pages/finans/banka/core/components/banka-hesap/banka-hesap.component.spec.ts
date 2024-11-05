import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankaHesapComponent } from './banka-hesap.component';

describe('BankaHesapComponent', () => {
  let component: BankaHesapComponent;
  let fixture: ComponentFixture<BankaHesapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BankaHesapComponent]
    });
    fixture = TestBed.createComponent(BankaHesapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

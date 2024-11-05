import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CariHesapComponent } from './cari-hesap.component';

describe('CariHesapComponent', () => {
  let component: CariHesapComponent;
  let fixture: ComponentFixture<CariHesapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CariHesapComponent]
    });
    fixture = TestBed.createComponent(CariHesapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBankaHesapComponent } from './list-banka-hesap.component';

describe('ListBankaHesapComponent', () => {
  let component: ListBankaHesapComponent;
  let fixture: ComponentFixture<ListBankaHesapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListBankaHesapComponent]
    });
    fixture = TestBed.createComponent(ListBankaHesapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

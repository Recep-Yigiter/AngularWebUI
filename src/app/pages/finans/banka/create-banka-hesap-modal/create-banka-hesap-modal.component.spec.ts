import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBankaHesapModalComponent } from './create-banka-hesap-modal.component';

describe('CreateBankaHesapModalComponent', () => {
  let component: CreateBankaHesapModalComponent;
  let fixture: ComponentFixture<CreateBankaHesapModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateBankaHesapModalComponent]
    });
    fixture = TestBed.createComponent(CreateBankaHesapModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

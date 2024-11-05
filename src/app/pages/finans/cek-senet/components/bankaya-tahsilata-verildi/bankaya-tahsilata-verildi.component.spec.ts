import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankayaTahsilataVerildiComponent } from './bankaya-tahsilata-verildi.component';

describe('BankayaTahsilataVerildiComponent', () => {
  let component: BankayaTahsilataVerildiComponent;
  let fixture: ComponentFixture<BankayaTahsilataVerildiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BankayaTahsilataVerildiComponent]
    });
    fixture = TestBed.createComponent(BankayaTahsilataVerildiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

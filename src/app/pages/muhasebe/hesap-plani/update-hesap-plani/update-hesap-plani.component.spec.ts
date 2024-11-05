import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHesapPlaniComponent } from './update-hesap-plani.component';

describe('UpdateHesapPlaniComponent', () => {
  let component: UpdateHesapPlaniComponent;
  let fixture: ComponentFixture<UpdateHesapPlaniComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateHesapPlaniComponent]
    });
    fixture = TestBed.createComponent(UpdateHesapPlaniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HesapPlaniComponent } from './hesap-plani.component';

describe('HesapPlaniComponent', () => {
  let component: HesapPlaniComponent;
  let fixture: ComponentFixture<HesapPlaniComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HesapPlaniComponent]
    });
    fixture = TestBed.createComponent(HesapPlaniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

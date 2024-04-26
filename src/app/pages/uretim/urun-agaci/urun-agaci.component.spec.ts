import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrunAgaciComponent } from './urun-agaci.component';

describe('UrunAgaciComponent', () => {
  let component: UrunAgaciComponent;
  let fixture: ComponentFixture<UrunAgaciComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UrunAgaciComponent]
    });
    fixture = TestBed.createComponent(UrunAgaciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

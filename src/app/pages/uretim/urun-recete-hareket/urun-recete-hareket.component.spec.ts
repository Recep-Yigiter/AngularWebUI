import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrunReceteHareketComponent } from './urun-recete-hareket.component';

describe('UrunReceteHareketComponent', () => {
  let component: UrunReceteHareketComponent;
  let fixture: ComponentFixture<UrunReceteHareketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UrunReceteHareketComponent]
    });
    fixture = TestBed.createComponent(UrunReceteHareketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

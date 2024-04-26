import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrunReceteComponent } from './urun-recete.component';

describe('UrunReceteComponent', () => {
  let component: UrunReceteComponent;
  let fixture: ComponentFixture<UrunReceteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UrunReceteComponent]
    });
    fixture = TestBed.createComponent(UrunReceteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

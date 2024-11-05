import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailKasaHareketComponent } from './detail-kasa-hareket.component';

describe('DetailKasaHareketComponent', () => {
  let component: DetailKasaHareketComponent;
  let fixture: ComponentFixture<DetailKasaHareketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailKasaHareketComponent]
    });
    fixture = TestBed.createComponent(DetailKasaHareketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

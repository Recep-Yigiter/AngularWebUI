import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KasaHareketComponent } from './kasa-hareket.component';

describe('KasaHareketComponent', () => {
  let component: KasaHareketComponent;
  let fixture: ComponentFixture<KasaHareketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KasaHareketComponent]
    });
    fixture = TestBed.createComponent(KasaHareketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

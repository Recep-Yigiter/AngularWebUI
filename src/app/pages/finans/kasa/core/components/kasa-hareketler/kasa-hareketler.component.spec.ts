import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KasaHareketlerComponent } from './kasa-hareketler.component';

describe('KasaHareketlerComponent', () => {
  let component: KasaHareketlerComponent;
  let fixture: ComponentFixture<KasaHareketlerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KasaHareketlerComponent]
    });
    fixture = TestBed.createComponent(KasaHareketlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

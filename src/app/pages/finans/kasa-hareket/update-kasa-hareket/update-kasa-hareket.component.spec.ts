import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateKasaHareketComponent } from './update-kasa-hareket.component';

describe('UpdateKasaHareketComponent', () => {
  let component: UpdateKasaHareketComponent;
  let fixture: ComponentFixture<UpdateKasaHareketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateKasaHareketComponent]
    });
    fixture = TestBed.createComponent(UpdateKasaHareketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

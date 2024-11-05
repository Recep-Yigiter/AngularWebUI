import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateKasaHareketComponent } from './create-kasa-hareket.component';

describe('CreateKasaHareketComponent', () => {
  let component: CreateKasaHareketComponent;
  let fixture: ComponentFixture<CreateKasaHareketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateKasaHareketComponent]
    });
    fixture = TestBed.createComponent(CreateKasaHareketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

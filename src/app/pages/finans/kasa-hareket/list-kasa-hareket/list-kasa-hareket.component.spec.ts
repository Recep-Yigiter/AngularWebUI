import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListKasaHareketComponent } from './list-kasa-hareket.component';

describe('ListKasaHareketComponent', () => {
  let component: ListKasaHareketComponent;
  let fixture: ComponentFixture<ListKasaHareketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListKasaHareketComponent]
    });
    fixture = TestBed.createComponent(ListKasaHareketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

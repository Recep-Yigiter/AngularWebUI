import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCariHareketComponent } from './list-cari-hareket.component';

describe('ListCariHareketComponent', () => {
  let component: ListCariHareketComponent;
  let fixture: ComponentFixture<ListCariHareketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCariHareketComponent]
    });
    fixture = TestBed.createComponent(ListCariHareketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

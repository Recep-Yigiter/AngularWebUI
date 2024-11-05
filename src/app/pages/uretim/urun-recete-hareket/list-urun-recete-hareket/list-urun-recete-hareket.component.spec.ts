import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUrunReceteHareketComponent } from './list-urun-recete-hareket.component';

describe('ListUrunReceteHareketComponent', () => {
  let component: ListUrunReceteHareketComponent;
  let fixture: ComponentFixture<ListUrunReceteHareketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListUrunReceteHareketComponent]
    });
    fixture = TestBed.createComponent(ListUrunReceteHareketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

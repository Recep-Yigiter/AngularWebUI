import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCekSenetHareketComponent } from './list-cek-senet-hareket.component';

describe('ListCekSenetHareketComponent', () => {
  let component: ListCekSenetHareketComponent;
  let fixture: ComponentFixture<ListCekSenetHareketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCekSenetHareketComponent]
    });
    fixture = TestBed.createComponent(ListCekSenetHareketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

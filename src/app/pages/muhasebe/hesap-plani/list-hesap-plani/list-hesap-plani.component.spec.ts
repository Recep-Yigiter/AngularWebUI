import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHesapPlaniComponent } from './list-hesap-plani.component';

describe('ListHesapPlaniComponent', () => {
  let component: ListHesapPlaniComponent;
  let fixture: ComponentFixture<ListHesapPlaniComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListHesapPlaniComponent]
    });
    fixture = TestBed.createComponent(ListHesapPlaniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

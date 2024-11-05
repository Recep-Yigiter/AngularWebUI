import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUretimEmriComponent } from './list-uretim-emri.component';

describe('ListUretimEmriComponent', () => {
  let component: ListUretimEmriComponent;
  let fixture: ComponentFixture<ListUretimEmriComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListUretimEmriComponent]
    });
    fixture = TestBed.createComponent(ListUretimEmriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

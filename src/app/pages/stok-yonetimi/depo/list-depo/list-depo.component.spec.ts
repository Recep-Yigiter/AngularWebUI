import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDepoComponent } from './list-depo.component';

describe('ListDepoComponent', () => {
  let component: ListDepoComponent;
  let fixture: ComponentFixture<ListDepoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListDepoComponent]
    });
    fixture = TestBed.createComponent(ListDepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

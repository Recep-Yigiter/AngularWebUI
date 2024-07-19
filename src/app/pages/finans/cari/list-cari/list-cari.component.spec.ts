import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCariComponent } from './list-cari.component';

describe('ListCariComponent', () => {
  let component: ListCariComponent;
  let fixture: ComponentFixture<ListCariComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCariComponent]
    });
    fixture = TestBed.createComponent(ListCariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

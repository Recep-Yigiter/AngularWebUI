import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDepartmanComponent } from './list-departman.component';

describe('ListDepartmanComponent', () => {
  let component: ListDepartmanComponent;
  let fixture: ComponentFixture<ListDepartmanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListDepartmanComponent]
    });
    fixture = TestBed.createComponent(ListDepartmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

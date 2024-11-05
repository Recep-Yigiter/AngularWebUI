import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFisComponent } from './list-fis.component';

describe('ListFisComponent', () => {
  let component: ListFisComponent;
  let fixture: ComponentFixture<ListFisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListFisComponent]
    });
    fixture = TestBed.createComponent(ListFisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAlinanCekComponent } from './list-alinan-cek.component';

describe('ListAlinanCekComponent', () => {
  let component: ListAlinanCekComponent;
  let fixture: ComponentFixture<ListAlinanCekComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListAlinanCekComponent]
    });
    fixture = TestBed.createComponent(ListAlinanCekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

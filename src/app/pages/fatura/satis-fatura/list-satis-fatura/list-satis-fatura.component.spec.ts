import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSatisFaturaComponent } from './list-satis-fatura.component';

describe('ListSatisFaturaComponent', () => {
  let component: ListSatisFaturaComponent;
  let fixture: ComponentFixture<ListSatisFaturaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSatisFaturaComponent]
    });
    fixture = TestBed.createComponent(ListSatisFaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

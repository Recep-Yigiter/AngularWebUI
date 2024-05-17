import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAlisFaturaComponent } from './list-alis-fatura.component';

describe('ListAlisFaturaComponent', () => {
  let component: ListAlisFaturaComponent;
  let fixture: ComponentFixture<ListAlisFaturaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListAlisFaturaComponent]
    });
    fixture = TestBed.createComponent(ListAlisFaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

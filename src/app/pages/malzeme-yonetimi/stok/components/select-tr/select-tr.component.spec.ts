import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTrComponent } from './select-tr.component';

describe('SelectTrComponent', () => {
  let component: SelectTrComponent;
  let fixture: ComponentFixture<SelectTrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectTrComponent]
    });
    fixture = TestBed.createComponent(SelectTrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

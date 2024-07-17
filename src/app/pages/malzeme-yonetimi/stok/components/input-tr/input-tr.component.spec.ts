import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTrComponent } from './input-tr.component';

describe('InputTrComponent', () => {
  let component: InputTrComponent;
  let fixture: ComponentFixture<InputTrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputTrComponent]
    });
    fixture = TestBed.createComponent(InputTrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

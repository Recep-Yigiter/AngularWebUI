import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MalAlisComponent } from './mal-alis.component';

describe('MalAlisComponent', () => {
  let component: MalAlisComponent;
  let fixture: ComponentFixture<MalAlisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MalAlisComponent]
    });
    fixture = TestBed.createComponent(MalAlisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinansComponent } from './finans.component';

describe('FinansComponent', () => {
  let component: FinansComponent;
  let fixture: ComponentFixture<FinansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinansComponent]
    });
    fixture = TestBed.createComponent(FinansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

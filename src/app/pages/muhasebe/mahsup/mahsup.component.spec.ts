import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MahsupComponent } from './mahsup.component';

describe('MahsupComponent', () => {
  let component: MahsupComponent;
  let fixture: ComponentFixture<MahsupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MahsupComponent]
    });
    fixture = TestBed.createComponent(MahsupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

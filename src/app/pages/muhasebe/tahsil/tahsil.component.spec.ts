import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TahsilComponent } from './tahsil.component';

describe('TahsilComponent', () => {
  let component: TahsilComponent;
  let fixture: ComponentFixture<TahsilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TahsilComponent]
    });
    fixture = TestBed.createComponent(TahsilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

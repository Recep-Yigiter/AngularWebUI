import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MahsupDesignComponent } from './mahsup-design.component';

describe('MahsupDesignComponent', () => {
  let component: MahsupDesignComponent;
  let fixture: ComponentFixture<MahsupDesignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MahsupDesignComponent]
    });
    fixture = TestBed.createComponent(MahsupDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TahsilDesignComponent } from './tahsil-design.component';

describe('TahsilDesignComponent', () => {
  let component: TahsilDesignComponent;
  let fixture: ComponentFixture<TahsilDesignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TahsilDesignComponent]
    });
    fixture = TestBed.createComponent(TahsilDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

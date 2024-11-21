import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmanDesignComponent } from './departman-design.component';

describe('DepartmanDesignComponent', () => {
  let component: DepartmanDesignComponent;
  let fixture: ComponentFixture<DepartmanDesignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepartmanDesignComponent]
    });
    fixture = TestBed.createComponent(DepartmanDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

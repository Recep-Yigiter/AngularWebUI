import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UretimEmriComponent } from './uretim-emri.component';

describe('UretimEmriComponent', () => {
  let component: UretimEmriComponent;
  let fixture: ComponentFixture<UretimEmriComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UretimEmriComponent]
    });
    fixture = TestBed.createComponent(UretimEmriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

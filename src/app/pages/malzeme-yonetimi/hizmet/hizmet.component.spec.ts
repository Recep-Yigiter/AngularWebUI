import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HizmetComponent } from './hizmet.component';

describe('HizmetComponent', () => {
  let component: HizmetComponent;
  let fixture: ComponentFixture<HizmetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HizmetComponent]
    });
    fixture = TestBed.createComponent(HizmetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

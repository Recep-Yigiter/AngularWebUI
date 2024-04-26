import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHizmetComponent } from './update-hizmet.component';

describe('UpdateHizmetComponent', () => {
  let component: UpdateHizmetComponent;
  let fixture: ComponentFixture<UpdateHizmetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateHizmetComponent]
    });
    fixture = TestBed.createComponent(UpdateHizmetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

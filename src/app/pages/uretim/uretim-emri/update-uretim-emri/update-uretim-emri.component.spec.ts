import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUretimEmriComponent } from './update-uretim-emri.component';

describe('UpdateUretimEmriComponent', () => {
  let component: UpdateUretimEmriComponent;
  let fixture: ComponentFixture<UpdateUretimEmriComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateUretimEmriComponent]
    });
    fixture = TestBed.createComponent(UpdateUretimEmriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMahsupComponent } from './update-mahsup.component';

describe('UpdateMahsupComponent', () => {
  let component: UpdateMahsupComponent;
  let fixture: ComponentFixture<UpdateMahsupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateMahsupComponent]
    });
    fixture = TestBed.createComponent(UpdateMahsupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

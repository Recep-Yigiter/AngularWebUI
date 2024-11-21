import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDepartmanComponent } from './update-departman.component';

describe('UpdateDepartmanComponent', () => {
  let component: UpdateDepartmanComponent;
  let fixture: ComponentFixture<UpdateDepartmanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateDepartmanComponent]
    });
    fixture = TestBed.createComponent(UpdateDepartmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

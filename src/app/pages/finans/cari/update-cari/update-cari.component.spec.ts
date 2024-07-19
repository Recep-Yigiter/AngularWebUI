import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCariComponent } from './update-cari.component';

describe('UpdateCariComponent', () => {
  let component: UpdateCariComponent;
  let fixture: ComponentFixture<UpdateCariComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateCariComponent]
    });
    fixture = TestBed.createComponent(UpdateCariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

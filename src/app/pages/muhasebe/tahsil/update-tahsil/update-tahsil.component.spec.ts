import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTahsilComponent } from './update-tahsil.component';

describe('UpdateTahsilComponent', () => {
  let component: UpdateTahsilComponent;
  let fixture: ComponentFixture<UpdateTahsilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateTahsilComponent]
    });
    fixture = TestBed.createComponent(UpdateTahsilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

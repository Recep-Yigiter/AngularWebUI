import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCekSenetComponent } from './update-cek-senet.component';

describe('UpdateCekSenetComponent', () => {
  let component: UpdateCekSenetComponent;
  let fixture: ComponentFixture<UpdateCekSenetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateCekSenetComponent]
    });
    fixture = TestBed.createComponent(UpdateCekSenetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

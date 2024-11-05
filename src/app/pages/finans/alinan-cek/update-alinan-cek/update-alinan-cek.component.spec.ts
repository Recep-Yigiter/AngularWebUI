import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAlinanCekComponent } from './update-alinan-cek.component';

describe('UpdateAlinanCekComponent', () => {
  let component: UpdateAlinanCekComponent;
  let fixture: ComponentFixture<UpdateAlinanCekComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateAlinanCekComponent]
    });
    fixture = TestBed.createComponent(UpdateAlinanCekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

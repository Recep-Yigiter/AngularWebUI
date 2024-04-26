import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateIsMerkeziComponent } from './update-is-merkezi.component';

describe('UpdateIsMerkeziComponent', () => {
  let component: UpdateIsMerkeziComponent;
  let fixture: ComponentFixture<UpdateIsMerkeziComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateIsMerkeziComponent]
    });
    fixture = TestBed.createComponent(UpdateIsMerkeziComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

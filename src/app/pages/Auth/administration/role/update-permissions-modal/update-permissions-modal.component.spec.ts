import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePermissionsModalComponent } from './update-permissions-modal.component';

describe('UpdatePermissionsModalComponent', () => {
  let component: UpdatePermissionsModalComponent;
  let fixture: ComponentFixture<UpdatePermissionsModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePermissionsModalComponent]
    });
    fixture = TestBed.createComponent(UpdatePermissionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

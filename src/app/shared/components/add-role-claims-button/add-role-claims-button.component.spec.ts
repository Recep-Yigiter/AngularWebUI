import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoleClaimsButtonComponent } from './add-role-claims-button.component';

describe('AddRoleClaimsButtonComponent', () => {
  let component: AddRoleClaimsButtonComponent;
  let fixture: ComponentFixture<AddRoleClaimsButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRoleClaimsButtonComponent]
    });
    fixture = TestBed.createComponent(AddRoleClaimsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

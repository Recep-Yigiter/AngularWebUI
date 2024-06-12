import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRoleModalComponent } from './create-role-modal.component';

describe('CreateRoleModalComponent', () => {
  let component: CreateRoleModalComponent;
  let fixture: ComponentFixture<CreateRoleModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateRoleModalComponent]
    });
    fixture = TestBed.createComponent(CreateRoleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

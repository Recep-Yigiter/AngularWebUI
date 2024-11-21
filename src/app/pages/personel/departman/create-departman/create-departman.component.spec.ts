import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDepartmanComponent } from './create-departman.component';

describe('CreateDepartmanComponent', () => {
  let component: CreateDepartmanComponent;
  let fixture: ComponentFixture<CreateDepartmanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateDepartmanComponent]
    });
    fixture = TestBed.createComponent(CreateDepartmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

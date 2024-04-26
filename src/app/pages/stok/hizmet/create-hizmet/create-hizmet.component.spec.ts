import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHizmetComponent } from './create-hizmet.component';

describe('CreateHizmetComponent', () => {
  let component: CreateHizmetComponent;
  let fixture: ComponentFixture<CreateHizmetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateHizmetComponent]
    });
    fixture = TestBed.createComponent(CreateHizmetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

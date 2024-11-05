import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFisComponent } from './create-fis.component';

describe('CreateFisComponent', () => {
  let component: CreateFisComponent;
  let fixture: ComponentFixture<CreateFisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateFisComponent]
    });
    fixture = TestBed.createComponent(CreateFisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMahsupComponent } from './create-mahsup.component';

describe('CreateMahsupComponent', () => {
  let component: CreateMahsupComponent;
  let fixture: ComponentFixture<CreateMahsupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateMahsupComponent]
    });
    fixture = TestBed.createComponent(CreateMahsupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

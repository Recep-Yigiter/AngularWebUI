import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCariComponent } from './create-cari.component';

describe('CreateCariComponent', () => {
  let component: CreateCariComponent;
  let fixture: ComponentFixture<CreateCariComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCariComponent]
    });
    fixture = TestBed.createComponent(CreateCariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

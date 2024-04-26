import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUretimEmriComponent } from './create-uretim-emri.component';

describe('CreateUretimEmriComponent', () => {
  let component: CreateUretimEmriComponent;
  let fixture: ComponentFixture<CreateUretimEmriComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUretimEmriComponent]
    });
    fixture = TestBed.createComponent(CreateUretimEmriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAlinanCekComponent } from './create-alinan-cek.component';

describe('CreateAlinanCekComponent', () => {
  let component: CreateAlinanCekComponent;
  let fixture: ComponentFixture<CreateAlinanCekComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAlinanCekComponent]
    });
    fixture = TestBed.createComponent(CreateAlinanCekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCekSenetComponent } from './create-cek-senet.component';

describe('CreateCekSenetComponent', () => {
  let component: CreateCekSenetComponent;
  let fixture: ComponentFixture<CreateCekSenetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCekSenetComponent]
    });
    fixture = TestBed.createComponent(CreateCekSenetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

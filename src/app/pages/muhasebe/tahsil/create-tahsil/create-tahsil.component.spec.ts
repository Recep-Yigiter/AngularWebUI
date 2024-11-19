import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTahsilComponent } from './create-tahsil.component';

describe('CreateTahsilComponent', () => {
  let component: CreateTahsilComponent;
  let fixture: ComponentFixture<CreateTahsilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTahsilComponent]
    });
    fixture = TestBed.createComponent(CreateTahsilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

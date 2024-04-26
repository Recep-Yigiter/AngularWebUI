import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDepoComponent } from './create-depo.component';

describe('CreateDepoComponent', () => {
  let component: CreateDepoComponent;
  let fixture: ComponentFixture<CreateDepoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateDepoComponent]
    });
    fixture = TestBed.createComponent(CreateDepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

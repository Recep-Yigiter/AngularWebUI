import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStokComponent } from './create-stok.component';

describe('CreateStokComponent', () => {
  let component: CreateStokComponent;
  let fixture: ComponentFixture<CreateStokComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateStokComponent]
    });
    fixture = TestBed.createComponent(CreateStokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

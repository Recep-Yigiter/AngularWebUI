import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMasrafComponent } from './create-masraf.component';

describe('CreateMasrafComponent', () => {
  let component: CreateMasrafComponent;
  let fixture: ComponentFixture<CreateMasrafComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateMasrafComponent]
    });
    fixture = TestBed.createComponent(CreateMasrafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

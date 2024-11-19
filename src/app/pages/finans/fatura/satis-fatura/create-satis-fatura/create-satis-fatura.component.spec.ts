import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSatisFaturaComponent } from './create-satis-fatura.component';

describe('CreateSatisFaturaComponent', () => {
  let component: CreateSatisFaturaComponent;
  let fixture: ComponentFixture<CreateSatisFaturaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSatisFaturaComponent]
    });
    fixture = TestBed.createComponent(CreateSatisFaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

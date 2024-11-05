import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFisFromFaturaComponent } from './create-fis-from-fatura.component';

describe('CreateFisFromFaturaComponent', () => {
  let component: CreateFisFromFaturaComponent;
  let fixture: ComponentFixture<CreateFisFromFaturaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateFisFromFaturaComponent]
    });
    fixture = TestBed.createComponent(CreateFisFromFaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

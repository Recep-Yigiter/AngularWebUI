import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAlisFaturaComponent } from './create-alis-fatura.component';

describe('CreateAlisFaturaComponent', () => {
  let component: CreateAlisFaturaComponent;
  let fixture: ComponentFixture<CreateAlisFaturaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAlisFaturaComponent]
    });
    fixture = TestBed.createComponent(CreateAlisFaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

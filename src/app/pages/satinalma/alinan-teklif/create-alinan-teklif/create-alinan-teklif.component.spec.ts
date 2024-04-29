import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAlinanTeklifComponent } from './create-alinan-teklif.component';

describe('CreateAlinanTeklifComponent', () => {
  let component: CreateAlinanTeklifComponent;
  let fixture: ComponentFixture<CreateAlinanTeklifComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAlinanTeklifComponent]
    });
    fixture = TestBed.createComponent(CreateAlinanTeklifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

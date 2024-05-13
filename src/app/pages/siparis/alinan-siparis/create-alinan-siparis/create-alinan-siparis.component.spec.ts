import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAlinanSiparisComponent } from './create-alinan-siparis.component';

describe('CreateAlinanSiparisComponent', () => {
  let component: CreateAlinanSiparisComponent;
  let fixture: ComponentFixture<CreateAlinanSiparisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAlinanSiparisComponent]
    });
    fixture = TestBed.createComponent(CreateAlinanSiparisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

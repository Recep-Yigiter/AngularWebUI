import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlinanCekComponent } from './alinan-cek.component';

describe('AlinanCekComponent', () => {
  let component: AlinanCekComponent;
  let fixture: ComponentFixture<AlinanCekComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlinanCekComponent]
    });
    fixture = TestBed.createComponent(AlinanCekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

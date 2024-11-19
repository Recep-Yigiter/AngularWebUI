import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlisFaturaComponent } from './alis-fatura.component';

describe('AlisFaturaComponent', () => {
  let component: AlisFaturaComponent;
  let fixture: ComponentFixture<AlisFaturaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlisFaturaComponent]
    });
    fixture = TestBed.createComponent(AlisFaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

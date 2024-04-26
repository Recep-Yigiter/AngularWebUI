import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatisFaturaComponent } from './satis-fatura.component';

describe('SatisFaturaComponent', () => {
  let component: SatisFaturaComponent;
  let fixture: ComponentFixture<SatisFaturaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SatisFaturaComponent]
    });
    fixture = TestBed.createComponent(SatisFaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

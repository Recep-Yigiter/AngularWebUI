import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSatisFaturaComponent } from './update-satis-fatura.component';

describe('UpdateSatisFaturaComponent', () => {
  let component: UpdateSatisFaturaComponent;
  let fixture: ComponentFixture<UpdateSatisFaturaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateSatisFaturaComponent]
    });
    fixture = TestBed.createComponent(UpdateSatisFaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

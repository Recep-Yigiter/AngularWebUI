import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAlisFaturaComponent } from './update-alis-fatura.component';

describe('UpdateAlisFaturaComponent', () => {
  let component: UpdateAlisFaturaComponent;
  let fixture: ComponentFixture<UpdateAlisFaturaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateAlisFaturaComponent]
    });
    fixture = TestBed.createComponent(UpdateAlisFaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

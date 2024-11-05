import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FisComponent } from './fis.component';

describe('FisComponent', () => {
  let component: FisComponent;
  let fixture: ComponentFixture<FisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FisComponent]
    });
    fixture = TestBed.createComponent(FisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

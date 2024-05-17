import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeklifComponent } from './teklif.component';

describe('TeklifComponent', () => {
  let component: TeklifComponent;
  let fixture: ComponentFixture<TeklifComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeklifComponent]
    });
    fixture = TestBed.createComponent(TeklifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

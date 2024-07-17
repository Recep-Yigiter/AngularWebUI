import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirimComponent } from './birim.component';

describe('BirimComponent', () => {
  let component: BirimComponent;
  let fixture: ComponentFixture<BirimComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BirimComponent]
    });
    fixture = TestBed.createComponent(BirimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

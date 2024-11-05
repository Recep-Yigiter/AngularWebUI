import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuhasebeComponent } from './muhasebe.component';

describe('MuhasebeComponent', () => {
  let component: MuhasebeComponent;
  let fixture: ComponentFixture<MuhasebeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MuhasebeComponent]
    });
    fixture = TestBed.createComponent(MuhasebeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

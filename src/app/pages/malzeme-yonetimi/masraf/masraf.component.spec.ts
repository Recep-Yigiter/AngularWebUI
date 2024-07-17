import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasrafComponent } from './masraf.component';

describe('MasrafComponent', () => {
  let component: MasrafComponent;
  let fixture: ComponentFixture<MasrafComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MasrafComponent]
    });
    fixture = TestBed.createComponent(MasrafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

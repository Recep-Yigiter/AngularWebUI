import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UretimTabComponent } from './uretim-tab.component';

describe('UretimTabComponent', () => {
  let component: UretimTabComponent;
  let fixture: ComponentFixture<UretimTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UretimTabComponent]
    });
    fixture = TestBed.createComponent(UretimTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

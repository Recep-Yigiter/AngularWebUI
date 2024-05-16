import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnayDurumSelectComponent } from './onay-durum-select.component';

describe('OnayDurumSelectComponent', () => {
  let component: OnayDurumSelectComponent;
  let fixture: ComponentFixture<OnayDurumSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OnayDurumSelectComponent]
    });
    fixture = TestBed.createComponent(OnayDurumSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

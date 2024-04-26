import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UretimMaliyetAnaliziComponent } from './uretim-maliyet-analizi.component';

describe('UretimMaliyetAnaliziComponent', () => {
  let component: UretimMaliyetAnaliziComponent;
  let fixture: ComponentFixture<UretimMaliyetAnaliziComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UretimMaliyetAnaliziComponent]
    });
    fixture = TestBed.createComponent(UretimMaliyetAnaliziComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

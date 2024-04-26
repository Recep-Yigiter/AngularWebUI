import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenelBakisUretimMaliyetAnaliziComponent } from './genel-bakis-uretim-maliyet-analizi.component';

describe('GenelBakisUretimMaliyetAnaliziComponent', () => {
  let component: GenelBakisUretimMaliyetAnaliziComponent;
  let fixture: ComponentFixture<GenelBakisUretimMaliyetAnaliziComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenelBakisUretimMaliyetAnaliziComponent]
    });
    fixture = TestBed.createComponent(GenelBakisUretimMaliyetAnaliziComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

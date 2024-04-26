import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailUretimMaliyetAnaliziComponent } from './detail-uretim-maliyet-analizi.component';

describe('DetailUretimMaliyetAnaliziComponent', () => {
  let component: DetailUretimMaliyetAnaliziComponent;
  let fixture: ComponentFixture<DetailUretimMaliyetAnaliziComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailUretimMaliyetAnaliziComponent]
    });
    fixture = TestBed.createComponent(DetailUretimMaliyetAnaliziComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

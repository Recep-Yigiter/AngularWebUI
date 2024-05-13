import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailVerilenTeklifComponent } from './detail-verilen-teklif.component';

describe('DetailVerilenTeklifComponent', () => {
  let component: DetailVerilenTeklifComponent;
  let fixture: ComponentFixture<DetailVerilenTeklifComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailVerilenTeklifComponent]
    });
    fixture = TestBed.createComponent(DetailVerilenTeklifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

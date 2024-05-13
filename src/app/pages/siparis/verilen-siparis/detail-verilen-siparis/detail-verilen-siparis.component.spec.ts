import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailVerilenSiparisComponent } from './detail-verilen-siparis.component';

describe('DetailVerilenSiparisComponent', () => {
  let component: DetailVerilenSiparisComponent;
  let fixture: ComponentFixture<DetailVerilenSiparisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailVerilenSiparisComponent]
    });
    fixture = TestBed.createComponent(DetailVerilenSiparisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

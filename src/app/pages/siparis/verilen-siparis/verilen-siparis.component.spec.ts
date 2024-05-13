import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerilenSiparisComponent } from './verilen-siparis.component';

describe('VerilenSiparisComponent', () => {
  let component: VerilenSiparisComponent;
  let fixture: ComponentFixture<VerilenSiparisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerilenSiparisComponent]
    });
    fixture = TestBed.createComponent(VerilenSiparisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

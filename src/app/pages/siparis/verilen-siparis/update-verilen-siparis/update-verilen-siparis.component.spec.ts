import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVerilenSiparisComponent } from './update-verilen-siparis.component';

describe('UpdateVerilenSiparisComponent', () => {
  let component: UpdateVerilenSiparisComponent;
  let fixture: ComponentFixture<UpdateVerilenSiparisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateVerilenSiparisComponent]
    });
    fixture = TestBed.createComponent(UpdateVerilenSiparisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

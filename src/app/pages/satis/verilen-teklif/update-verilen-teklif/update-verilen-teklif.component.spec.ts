import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVerilenTeklifComponent } from './update-verilen-teklif.component';

describe('UpdateVerilenTeklifComponent', () => {
  let component: UpdateVerilenTeklifComponent;
  let fixture: ComponentFixture<UpdateVerilenTeklifComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateVerilenTeklifComponent]
    });
    fixture = TestBed.createComponent(UpdateVerilenTeklifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

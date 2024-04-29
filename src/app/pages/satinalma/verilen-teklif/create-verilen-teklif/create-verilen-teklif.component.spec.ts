import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVerilenTeklifComponent } from './create-verilen-teklif.component';

describe('CreateVerilenTeklifComponent', () => {
  let component: CreateVerilenTeklifComponent;
  let fixture: ComponentFixture<CreateVerilenTeklifComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateVerilenTeklifComponent]
    });
    fixture = TestBed.createComponent(CreateVerilenTeklifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVerilenSiparisComponent } from './create-verilen-siparis.component';

describe('CreateVerilenSiparisComponent', () => {
  let component: CreateVerilenSiparisComponent;
  let fixture: ComponentFixture<CreateVerilenSiparisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateVerilenSiparisComponent]
    });
    fixture = TestBed.createComponent(CreateVerilenSiparisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVerilenSiparisComponent } from './list-verilen-siparis.component';

describe('ListVerilenSiparisComponent', () => {
  let component: ListVerilenSiparisComponent;
  let fixture: ComponentFixture<ListVerilenSiparisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListVerilenSiparisComponent]
    });
    fixture = TestBed.createComponent(ListVerilenSiparisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVerilenTeklifComponent } from './list-verilen-teklif.component';

describe('ListVerilenTeklifComponent', () => {
  let component: ListVerilenTeklifComponent;
  let fixture: ComponentFixture<ListVerilenTeklifComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListVerilenTeklifComponent]
    });
    fixture = TestBed.createComponent(ListVerilenTeklifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

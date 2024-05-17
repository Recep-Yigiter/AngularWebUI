import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAlinanTeklifComponent } from './list-alinan-teklif.component';

describe('ListAlinanTeklifComponent', () => {
  let component: ListAlinanTeklifComponent;
  let fixture: ComponentFixture<ListAlinanTeklifComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListAlinanTeklifComponent]
    });
    fixture = TestBed.createComponent(ListAlinanTeklifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

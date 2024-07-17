import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAlinanSiparisComponent } from './list-alinan-siparis.component';

describe('ListAlinanSiparisComponent', () => {
  let component: ListAlinanSiparisComponent;
  let fixture: ComponentFixture<ListAlinanSiparisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListAlinanSiparisComponent]
    });
    fixture = TestBed.createComponent(ListAlinanSiparisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

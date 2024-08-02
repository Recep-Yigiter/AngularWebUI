import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBankaComponent } from './list-banka.component';

describe('ListBankaComponent', () => {
  let component: ListBankaComponent;
  let fixture: ComponentFixture<ListBankaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListBankaComponent]
    });
    fixture = TestBed.createComponent(ListBankaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

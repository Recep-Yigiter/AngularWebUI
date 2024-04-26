import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailStokActionsComponent } from './detail-stok-actions.component';

describe('DetailStokActionsComponent', () => {
  let component: DetailStokActionsComponent;
  let fixture: ComponentFixture<DetailStokActionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailStokActionsComponent]
    });
    fixture = TestBed.createComponent(DetailStokActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

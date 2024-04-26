import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StokAddRowModalComponent } from './stok-add-row-modal.component';

describe('StokAddRowModalComponent', () => {
  let component: StokAddRowModalComponent;
  let fixture: ComponentFixture<StokAddRowModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StokAddRowModalComponent]
    });
    fixture = TestBed.createComponent(StokAddRowModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

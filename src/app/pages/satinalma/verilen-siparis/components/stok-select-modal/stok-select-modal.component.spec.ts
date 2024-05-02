import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StokSelectModalComponent } from './stok-select-modal.component';

describe('StokSelectModalComponent', () => {
  let component: StokSelectModalComponent;
  let fixture: ComponentFixture<StokSelectModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StokSelectModalComponent]
    });
    fixture = TestBed.createComponent(StokSelectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

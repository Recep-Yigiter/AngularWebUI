import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CariSelectModalComponent } from './cari-select-modal.component';

describe('CariSelectModalComponent', () => {
  let component: CariSelectModalComponent;
  let fixture: ComponentFixture<CariSelectModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CariSelectModalComponent]
    });
    fixture = TestBed.createComponent(CariSelectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

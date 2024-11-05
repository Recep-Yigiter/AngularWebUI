import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CariHareketlerModalComponent } from './cari-hareketler-modal.component';

describe('CariHareketlerModalComponent', () => {
  let component: CariHareketlerModalComponent;
  let fixture: ComponentFixture<CariHareketlerModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CariHareketlerModalComponent]
    });
    fixture = TestBed.createComponent(CariHareketlerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

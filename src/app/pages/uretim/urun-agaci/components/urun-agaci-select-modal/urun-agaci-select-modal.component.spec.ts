import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrunAgaciSelectModalComponent } from './urun-agaci-select-modal.component';

describe('UrunAgaciSelectModalComponent', () => {
  let component: UrunAgaciSelectModalComponent;
  let fixture: ComponentFixture<UrunAgaciSelectModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UrunAgaciSelectModalComponent]
    });
    fixture = TestBed.createComponent(UrunAgaciSelectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StokYonetimiComponent } from './stok-yonetimi.component';

describe('StokYonetimiComponent', () => {
  let component: StokYonetimiComponent;
  let fixture: ComponentFixture<StokYonetimiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StokYonetimiComponent]
    });
    fixture = TestBed.createComponent(StokYonetimiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CariToplamComponent } from './cari-toplam.component';

describe('CariToplamComponent', () => {
  let component: CariToplamComponent;
  let fixture: ComponentFixture<CariToplamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CariToplamComponent]
    });
    fixture = TestBed.createComponent(CariToplamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

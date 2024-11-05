import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CariHareketlerComponent } from './cari-hareketler.component';

describe('CariHareketlerComponent', () => {
  let component: CariHareketlerComponent;
  let fixture: ComponentFixture<CariHareketlerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CariHareketlerComponent]
    });
    fixture = TestBed.createComponent(CariHareketlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

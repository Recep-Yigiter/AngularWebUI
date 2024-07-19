import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCariHareketlerComponent } from './detail-cari-hareketler.component';

describe('DetailCariHareketlerComponent', () => {
  let component: DetailCariHareketlerComponent;
  let fixture: ComponentFixture<DetailCariHareketlerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailCariHareketlerComponent]
    });
    fixture = TestBed.createComponent(DetailCariHareketlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

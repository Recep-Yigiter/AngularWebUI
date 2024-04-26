import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailUrunReceteComponent } from './detail-urun-recete.component';

describe('DetailUrunReceteComponent', () => {
  let component: DetailUrunReceteComponent;
  let fixture: ComponentFixture<DetailUrunReceteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailUrunReceteComponent]
    });
    fixture = TestBed.createComponent(DetailUrunReceteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

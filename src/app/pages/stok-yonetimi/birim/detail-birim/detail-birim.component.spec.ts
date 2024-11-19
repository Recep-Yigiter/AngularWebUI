import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBirimComponent } from './detail-birim.component';

describe('DetailBirimComponent', () => {
  let component: DetailBirimComponent;
  let fixture: ComponentFixture<DetailBirimComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailBirimComponent]
    });
    fixture = TestBed.createComponent(DetailBirimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailStokComponent } from './detail-stok.component';

describe('DetailStokComponent', () => {
  let component: DetailStokComponent;
  let fixture: ComponentFixture<DetailStokComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailStokComponent]
    });
    fixture = TestBed.createComponent(DetailStokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

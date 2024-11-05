import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailKasaComponent } from './detail-kasa.component';

describe('DetailKasaComponent', () => {
  let component: DetailKasaComponent;
  let fixture: ComponentFixture<DetailKasaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailKasaComponent]
    });
    fixture = TestBed.createComponent(DetailKasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

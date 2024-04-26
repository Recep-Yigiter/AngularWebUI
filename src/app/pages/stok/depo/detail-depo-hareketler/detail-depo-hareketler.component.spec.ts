import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDepoHareketlerComponent } from './detail-depo-hareketler.component';

describe('DetailDepoHareketlerComponent', () => {
  let component: DetailDepoHareketlerComponent;
  let fixture: ComponentFixture<DetailDepoHareketlerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailDepoHareketlerComponent]
    });
    fixture = TestBed.createComponent(DetailDepoHareketlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

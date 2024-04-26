import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDepoComponent } from './detail-depo.component';

describe('DetailDepoComponent', () => {
  let component: DetailDepoComponent;
  let fixture: ComponentFixture<DetailDepoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailDepoComponent]
    });
    fixture = TestBed.createComponent(DetailDepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

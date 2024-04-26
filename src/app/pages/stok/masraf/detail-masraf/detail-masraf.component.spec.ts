import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMasrafComponent } from './detail-masraf.component';

describe('DetailMasrafComponent', () => {
  let component: DetailMasrafComponent;
  let fixture: ComponentFixture<DetailMasrafComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailMasrafComponent]
    });
    fixture = TestBed.createComponent(DetailMasrafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCariComponent } from './detail-cari.component';

describe('DetailCariComponent', () => {
  let component: DetailCariComponent;
  let fixture: ComponentFixture<DetailCariComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailCariComponent]
    });
    fixture = TestBed.createComponent(DetailCariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

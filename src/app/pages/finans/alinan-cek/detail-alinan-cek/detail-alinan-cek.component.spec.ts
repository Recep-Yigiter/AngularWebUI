import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAlinanCekComponent } from './detail-alinan-cek.component';

describe('DetailAlinanCekComponent', () => {
  let component: DetailAlinanCekComponent;
  let fixture: ComponentFixture<DetailAlinanCekComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailAlinanCekComponent]
    });
    fixture = TestBed.createComponent(DetailAlinanCekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

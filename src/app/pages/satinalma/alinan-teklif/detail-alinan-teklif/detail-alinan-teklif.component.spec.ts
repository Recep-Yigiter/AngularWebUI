import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAlinanTeklifComponent } from './detail-alinan-teklif.component';

describe('DetailAlinanTeklifComponent', () => {
  let component: DetailAlinanTeklifComponent;
  let fixture: ComponentFixture<DetailAlinanTeklifComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailAlinanTeklifComponent]
    });
    fixture = TestBed.createComponent(DetailAlinanTeklifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

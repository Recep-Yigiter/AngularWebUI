import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAlinanSiparisComponent } from './detail-alinan-siparis.component';

describe('DetailAlinanSiparisComponent', () => {
  let component: DetailAlinanSiparisComponent;
  let fixture: ComponentFixture<DetailAlinanSiparisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailAlinanSiparisComponent]
    });
    fixture = TestBed.createComponent(DetailAlinanSiparisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

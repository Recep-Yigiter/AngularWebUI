import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBankaComponent } from './detail-banka.component';

describe('DetailBankaComponent', () => {
  let component: DetailBankaComponent;
  let fixture: ComponentFixture<DetailBankaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailBankaComponent]
    });
    fixture = TestBed.createComponent(DetailBankaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

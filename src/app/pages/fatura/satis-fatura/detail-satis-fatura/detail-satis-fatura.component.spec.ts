import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSatisFaturaComponent } from './detail-satis-fatura.component';

describe('DetailSatisFaturaComponent', () => {
  let component: DetailSatisFaturaComponent;
  let fixture: ComponentFixture<DetailSatisFaturaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailSatisFaturaComponent]
    });
    fixture = TestBed.createComponent(DetailSatisFaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

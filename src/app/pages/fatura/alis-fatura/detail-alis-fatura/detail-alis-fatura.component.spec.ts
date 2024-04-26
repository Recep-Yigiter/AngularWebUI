import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAlisFaturaComponent } from './detail-alis-fatura.component';

describe('DetailAlisFaturaComponent', () => {
  let component: DetailAlisFaturaComponent;
  let fixture: ComponentFixture<DetailAlisFaturaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailAlisFaturaComponent]
    });
    fixture = TestBed.createComponent(DetailAlisFaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

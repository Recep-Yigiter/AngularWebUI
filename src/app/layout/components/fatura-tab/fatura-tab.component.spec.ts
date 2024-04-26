import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaturaTabComponent } from './fatura-tab.component';

describe('FaturaTabComponent', () => {
  let component: FaturaTabComponent;
  let fixture: ComponentFixture<FaturaTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FaturaTabComponent]
    });
    fixture = TestBed.createComponent(FaturaTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

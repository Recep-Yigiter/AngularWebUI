import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleInputTrComponent } from './title-input-tr.component';

describe('TitleInputTrComponent', () => {
  let component: TitleInputTrComponent;
  let fixture: ComponentFixture<TitleInputTrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TitleInputTrComponent]
    });
    fixture = TestBed.createComponent(TitleInputTrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsMerkeziComponent } from './is-merkezi.component';

describe('IsMerkeziComponent', () => {
  let component: IsMerkeziComponent;
  let fixture: ComponentFixture<IsMerkeziComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IsMerkeziComponent]
    });
    fixture = TestBed.createComponent(IsMerkeziComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

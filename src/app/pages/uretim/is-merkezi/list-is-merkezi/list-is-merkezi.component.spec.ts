import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIsMerkeziComponent } from './list-is-merkezi.component';

describe('ListIsMerkeziComponent', () => {
  let component: ListIsMerkeziComponent;
  let fixture: ComponentFixture<ListIsMerkeziComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListIsMerkeziComponent]
    });
    fixture = TestBed.createComponent(ListIsMerkeziComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

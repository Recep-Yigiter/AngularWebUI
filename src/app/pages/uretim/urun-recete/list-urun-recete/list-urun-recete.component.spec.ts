import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUrunReceteComponent } from './list-urun-recete.component';

describe('ListUrunReceteComponent', () => {
  let component: ListUrunReceteComponent;
  let fixture: ComponentFixture<ListUrunReceteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListUrunReceteComponent]
    });
    fixture = TestBed.createComponent(ListUrunReceteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

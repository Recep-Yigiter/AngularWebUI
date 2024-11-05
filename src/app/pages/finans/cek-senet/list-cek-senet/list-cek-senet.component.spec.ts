import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCekSenetComponent } from './list-cek-senet.component';

describe('ListCekSenetComponent', () => {
  let component: ListCekSenetComponent;
  let fixture: ComponentFixture<ListCekSenetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCekSenetComponent]
    });
    fixture = TestBed.createComponent(ListCekSenetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

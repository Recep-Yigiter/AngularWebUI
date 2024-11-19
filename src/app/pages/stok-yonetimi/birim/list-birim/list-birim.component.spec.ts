import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBirimComponent } from './list-birim.component';

describe('ListBirimComponent', () => {
  let component: ListBirimComponent;
  let fixture: ComponentFixture<ListBirimComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListBirimComponent]
    });
    fixture = TestBed.createComponent(ListBirimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

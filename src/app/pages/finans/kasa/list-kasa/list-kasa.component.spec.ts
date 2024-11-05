import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListKasaComponent } from './list-kasa.component';

describe('ListKasaComponent', () => {
  let component: ListKasaComponent;
  let fixture: ComponentFixture<ListKasaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListKasaComponent]
    });
    fixture = TestBed.createComponent(ListKasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

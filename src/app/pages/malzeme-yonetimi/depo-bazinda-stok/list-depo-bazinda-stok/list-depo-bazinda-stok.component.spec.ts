import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDepoBazindaStokComponent } from './list-depo-bazinda-stok.component';

describe('ListDepoBazindaStokComponent', () => {
  let component: ListDepoBazindaStokComponent;
  let fixture: ComponentFixture<ListDepoBazindaStokComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListDepoBazindaStokComponent]
    });
    fixture = TestBed.createComponent(ListDepoBazindaStokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

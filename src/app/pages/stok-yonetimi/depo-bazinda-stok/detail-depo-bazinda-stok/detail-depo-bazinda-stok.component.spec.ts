import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDepoBazindaStokComponent } from './detail-depo-bazinda-stok.component';

describe('DetailDepoBazindaStokComponent', () => {
  let component: DetailDepoBazindaStokComponent;
  let fixture: ComponentFixture<DetailDepoBazindaStokComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailDepoBazindaStokComponent]
    });
    fixture = TestBed.createComponent(DetailDepoBazindaStokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

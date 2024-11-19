import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepoBazindaStokComponent } from './depo-bazinda-stok.component';

describe('DepoBazindaStokComponent', () => {
  let component: DepoBazindaStokComponent;
  let fixture: ComponentFixture<DepoBazindaStokComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepoBazindaStokComponent]
    });
    fixture = TestBed.createComponent(DepoBazindaStokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

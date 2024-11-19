import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDepoBazindaStokComponent } from './update-depo-bazinda-stok.component';

describe('UpdateDepoBazindaStokComponent', () => {
  let component: UpdateDepoBazindaStokComponent;
  let fixture: ComponentFixture<UpdateDepoBazindaStokComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateDepoBazindaStokComponent]
    });
    fixture = TestBed.createComponent(UpdateDepoBazindaStokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

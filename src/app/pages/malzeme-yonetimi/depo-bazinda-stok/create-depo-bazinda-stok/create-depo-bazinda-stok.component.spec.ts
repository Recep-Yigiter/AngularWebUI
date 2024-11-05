import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDepoBazindaStokComponent } from './create-depo-bazinda-stok.component';

describe('CreateDepoBazindaStokComponent', () => {
  let component: CreateDepoBazindaStokComponent;
  let fixture: ComponentFixture<CreateDepoBazindaStokComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateDepoBazindaStokComponent]
    });
    fixture = TestBed.createComponent(CreateDepoBazindaStokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

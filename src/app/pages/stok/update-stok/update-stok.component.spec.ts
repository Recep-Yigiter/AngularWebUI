import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStokComponent } from './update-stok.component';

describe('UpdateStokComponent', () => {
  let component: UpdateStokComponent;
  let fixture: ComponentFixture<UpdateStokComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateStokComponent]
    });
    fixture = TestBed.createComponent(UpdateStokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

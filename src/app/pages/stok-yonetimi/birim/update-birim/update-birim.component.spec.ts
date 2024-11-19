import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBirimComponent } from './update-birim.component';

describe('UpdateBirimComponent', () => {
  let component: UpdateBirimComponent;
  let fixture: ComponentFixture<UpdateBirimComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateBirimComponent]
    });
    fixture = TestBed.createComponent(UpdateBirimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

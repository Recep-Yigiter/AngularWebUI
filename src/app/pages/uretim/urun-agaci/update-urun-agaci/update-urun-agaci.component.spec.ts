import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUrunAgaciComponent } from './update-urun-agaci.component';

describe('UpdateUrunAgaciComponent', () => {
  let component: UpdateUrunAgaciComponent;
  let fixture: ComponentFixture<UpdateUrunAgaciComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateUrunAgaciComponent]
    });
    fixture = TestBed.createComponent(UpdateUrunAgaciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

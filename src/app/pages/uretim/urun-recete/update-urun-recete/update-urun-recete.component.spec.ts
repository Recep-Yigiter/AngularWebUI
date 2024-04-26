import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUrunReceteComponent } from './update-urun-recete.component';

describe('UpdateUrunReceteComponent', () => {
  let component: UpdateUrunReceteComponent;
  let fixture: ComponentFixture<UpdateUrunReceteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateUrunReceteComponent]
    });
    fixture = TestBed.createComponent(UpdateUrunReceteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

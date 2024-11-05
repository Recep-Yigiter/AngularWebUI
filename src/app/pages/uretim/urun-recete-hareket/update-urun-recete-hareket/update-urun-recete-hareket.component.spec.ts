import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUrunReceteHareketComponent } from './update-urun-recete-hareket.component';

describe('UpdateUrunReceteHareketComponent', () => {
  let component: UpdateUrunReceteHareketComponent;
  let fixture: ComponentFixture<UpdateUrunReceteHareketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateUrunReceteHareketComponent]
    });
    fixture = TestBed.createComponent(UpdateUrunReceteHareketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

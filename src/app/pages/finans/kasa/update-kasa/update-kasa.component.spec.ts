import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateKasaComponent } from './update-kasa.component';

describe('UpdateKasaComponent', () => {
  let component: UpdateKasaComponent;
  let fixture: ComponentFixture<UpdateKasaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateKasaComponent]
    });
    fixture = TestBed.createComponent(UpdateKasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

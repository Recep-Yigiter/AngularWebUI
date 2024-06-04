import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDepoComponent } from './update-depo.component';

describe('UpdateDepoComponent', () => {
  let component: UpdateDepoComponent;
  let fixture: ComponentFixture<UpdateDepoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateDepoComponent]
    });
    fixture = TestBed.createComponent(UpdateDepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

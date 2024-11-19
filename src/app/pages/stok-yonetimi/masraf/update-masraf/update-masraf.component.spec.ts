import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMasrafComponent } from './update-masraf.component';

describe('UpdateMasrafComponent', () => {
  let component: UpdateMasrafComponent;
  let fixture: ComponentFixture<UpdateMasrafComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateMasrafComponent]
    });
    fixture = TestBed.createComponent(UpdateMasrafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

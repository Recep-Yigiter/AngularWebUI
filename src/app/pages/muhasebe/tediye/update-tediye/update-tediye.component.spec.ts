import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTediyeComponent } from './update-tediye.component';

describe('UpdateTediyeComponent', () => {
  let component: UpdateTediyeComponent;
  let fixture: ComponentFixture<UpdateTediyeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateTediyeComponent]
    });
    fixture = TestBed.createComponent(UpdateTediyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

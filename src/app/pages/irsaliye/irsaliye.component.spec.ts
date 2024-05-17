import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IrsaliyeComponent } from './irsaliye.component';

describe('IrsaliyeComponent', () => {
  let component: IrsaliyeComponent;
  let fixture: ComponentFixture<IrsaliyeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IrsaliyeComponent]
    });
    fixture = TestBed.createComponent(IrsaliyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

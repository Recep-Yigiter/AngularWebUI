import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TediyeComponent } from './tediye.component';

describe('TediyeComponent', () => {
  let component: TediyeComponent;
  let fixture: ComponentFixture<TediyeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TediyeComponent]
    });
    fixture = TestBed.createComponent(TediyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

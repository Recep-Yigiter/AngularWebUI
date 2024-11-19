import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YonetimComponent } from './yonetim.component';

describe('YonetimComponent', () => {
  let component: YonetimComponent;
  let fixture: ComponentFixture<YonetimComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YonetimComponent]
    });
    fixture = TestBed.createComponent(YonetimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

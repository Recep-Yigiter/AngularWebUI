import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MalzemeYonetimiComponent } from './malzeme-yonetimi.component';

describe('MalzemeYonetimiComponent', () => {
  let component: MalzemeYonetimiComponent;
  let fixture: ComponentFixture<MalzemeYonetimiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MalzemeYonetimiComponent]
    });
    fixture = TestBed.createComponent(MalzemeYonetimiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

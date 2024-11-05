import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirmanComponent } from './virman.component';

describe('VirmanComponent', () => {
  let component: VirmanComponent;
  let fixture: ComponentFixture<VirmanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VirmanComponent]
    });
    fixture = TestBed.createComponent(VirmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

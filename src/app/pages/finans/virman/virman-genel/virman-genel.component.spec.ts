import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirmanGenelComponent } from './virman-genel.component';

describe('VirmanGenelComponent', () => {
  let component: VirmanGenelComponent;
  let fixture: ComponentFixture<VirmanGenelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VirmanGenelComponent]
    });
    fixture = TestBed.createComponent(VirmanGenelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

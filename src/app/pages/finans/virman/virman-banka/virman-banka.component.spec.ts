import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirmanBankaComponent } from './virman-banka.component';

describe('VirmanBankaComponent', () => {
  let component: VirmanBankaComponent;
  let fixture: ComponentFixture<VirmanBankaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VirmanBankaComponent]
    });
    fixture = TestBed.createComponent(VirmanBankaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

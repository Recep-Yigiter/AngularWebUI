import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBankaComponent } from './update-banka.component';

describe('UpdateBankaComponent', () => {
  let component: UpdateBankaComponent;
  let fixture: ComponentFixture<UpdateBankaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateBankaComponent]
    });
    fixture = TestBed.createComponent(UpdateBankaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

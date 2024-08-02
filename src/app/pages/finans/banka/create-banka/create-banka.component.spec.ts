import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBankaComponent } from './create-banka.component';

describe('CreateBankaComponent', () => {
  let component: CreateBankaComponent;
  let fixture: ComponentFixture<CreateBankaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateBankaComponent]
    });
    fixture = TestBed.createComponent(CreateBankaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

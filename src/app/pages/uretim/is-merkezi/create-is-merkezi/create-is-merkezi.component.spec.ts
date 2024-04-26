import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIsMerkeziComponent } from './create-is-merkezi.component';

describe('CreateIsMerkeziComponent', () => {
  let component: CreateIsMerkeziComponent;
  let fixture: ComponentFixture<CreateIsMerkeziComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateIsMerkeziComponent]
    });
    fixture = TestBed.createComponent(CreateIsMerkeziComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

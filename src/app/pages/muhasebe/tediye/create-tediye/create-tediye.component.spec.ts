import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTediyeComponent } from './create-tediye.component';

describe('CreateTediyeComponent', () => {
  let component: CreateTediyeComponent;
  let fixture: ComponentFixture<CreateTediyeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTediyeComponent]
    });
    fixture = TestBed.createComponent(CreateTediyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

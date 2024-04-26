import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUrunReceteComponent } from './create-urun-recete.component';

describe('CreateUrunReceteComponent', () => {
  let component: CreateUrunReceteComponent;
  let fixture: ComponentFixture<CreateUrunReceteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUrunReceteComponent]
    });
    fixture = TestBed.createComponent(CreateUrunReceteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUrunAgaciComponent } from './create-urun-agaci.component';

describe('CreateUrunAgaciComponent', () => {
  let component: CreateUrunAgaciComponent;
  let fixture: ComponentFixture<CreateUrunAgaciComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUrunAgaciComponent]
    });
    fixture = TestBed.createComponent(CreateUrunAgaciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

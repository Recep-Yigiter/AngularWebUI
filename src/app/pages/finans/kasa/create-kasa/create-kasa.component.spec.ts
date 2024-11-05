import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateKasaComponent } from './create-kasa.component';

describe('CreateKasaComponent', () => {
  let component: CreateKasaComponent;
  let fixture: ComponentFixture<CreateKasaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateKasaComponent]
    });
    fixture = TestBed.createComponent(CreateKasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

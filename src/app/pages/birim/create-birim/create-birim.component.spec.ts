import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBirimComponent } from './create-birim.component';

describe('CreateBirimComponent', () => {
  let component: CreateBirimComponent;
  let fixture: ComponentFixture<CreateBirimComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateBirimComponent]
    });
    fixture = TestBed.createComponent(CreateBirimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

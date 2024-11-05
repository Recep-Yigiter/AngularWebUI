import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHesapPlaniComponent } from './create-hesap-plani.component';

describe('CreateHesapPlaniComponent', () => {
  let component: CreateHesapPlaniComponent;
  let fixture: ComponentFixture<CreateHesapPlaniComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateHesapPlaniComponent]
    });
    fixture = TestBed.createComponent(CreateHesapPlaniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

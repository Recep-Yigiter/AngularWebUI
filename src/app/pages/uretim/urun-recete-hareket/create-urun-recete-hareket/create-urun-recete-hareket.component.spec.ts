import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUrunReceteHareketComponent } from './create-urun-recete-hareket.component';

describe('CreateUrunReceteHareketComponent', () => {
  let component: CreateUrunReceteHareketComponent;
  let fixture: ComponentFixture<CreateUrunReceteHareketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUrunReceteHareketComponent]
    });
    fixture = TestBed.createComponent(CreateUrunReceteHareketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

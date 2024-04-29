import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAlinanTeklifComponent } from './update-alinan-teklif.component';

describe('UpdateAlinanTeklifComponent', () => {
  let component: UpdateAlinanTeklifComponent;
  let fixture: ComponentFixture<UpdateAlinanTeklifComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateAlinanTeklifComponent]
    });
    fixture = TestBed.createComponent(UpdateAlinanTeklifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

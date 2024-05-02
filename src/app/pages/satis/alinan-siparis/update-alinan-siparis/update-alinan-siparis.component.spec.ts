import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAlinanSiparisComponent } from './update-alinan-siparis.component';

describe('UpdateAlinanSiparisComponent', () => {
  let component: UpdateAlinanSiparisComponent;
  let fixture: ComponentFixture<UpdateAlinanSiparisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateAlinanSiparisComponent]
    });
    fixture = TestBed.createComponent(UpdateAlinanSiparisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

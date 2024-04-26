import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperasyonSelectModalComponent } from './operasyon-select-modal.component';

describe('OperasyonSelectModalComponent', () => {
  let component: OperasyonSelectModalComponent;
  let fixture: ComponentFixture<OperasyonSelectModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OperasyonSelectModalComponent]
    });
    fixture = TestBed.createComponent(OperasyonSelectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

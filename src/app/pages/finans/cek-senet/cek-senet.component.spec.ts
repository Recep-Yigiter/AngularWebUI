import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CekSenetComponent } from './cek-senet.component';

describe('CekSenetComponent', () => {
  let component: CekSenetComponent;
  let fixture: ComponentFixture<CekSenetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CekSenetComponent]
    });
    fixture = TestBed.createComponent(CekSenetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

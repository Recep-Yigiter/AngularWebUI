import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiroEdildiComponent } from './ciro-edildi.component';

describe('CiroEdildiComponent', () => {
  let component: CiroEdildiComponent;
  let fixture: ComponentFixture<CiroEdildiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CiroEdildiComponent]
    });
    fixture = TestBed.createComponent(CiroEdildiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

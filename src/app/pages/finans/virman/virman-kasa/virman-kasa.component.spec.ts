import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirmanKasaComponent } from './virman-kasa.component';

describe('VirmanKasaComponent', () => {
  let component: VirmanKasaComponent;
  let fixture: ComponentFixture<VirmanKasaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VirmanKasaComponent]
    });
    fixture = TestBed.createComponent(VirmanKasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

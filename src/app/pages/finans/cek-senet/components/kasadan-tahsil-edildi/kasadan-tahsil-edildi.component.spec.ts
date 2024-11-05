import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KasadanTahsilEdildiComponent } from './kasadan-tahsil-edildi.component';

describe('KasadanTahsilEdildiComponent', () => {
  let component: KasadanTahsilEdildiComponent;
  let fixture: ComponentFixture<KasadanTahsilEdildiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KasadanTahsilEdildiComponent]
    });
    fixture = TestBed.createComponent(KasadanTahsilEdildiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

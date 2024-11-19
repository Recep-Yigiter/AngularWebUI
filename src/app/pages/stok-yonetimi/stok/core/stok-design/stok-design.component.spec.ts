import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StokDesignComponent } from './stok-design.component';

describe('StokDesignComponent', () => {
  let component: StokDesignComponent;
  let fixture: ComponentFixture<StokDesignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StokDesignComponent]
    });
    fixture = TestBed.createComponent(StokDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

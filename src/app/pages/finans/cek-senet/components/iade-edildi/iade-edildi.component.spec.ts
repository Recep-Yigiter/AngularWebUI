import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IadeEdildiComponent } from './iade-edildi.component';

describe('IadeEdildiComponent', () => {
  let component: IadeEdildiComponent;
  let fixture: ComponentFixture<IadeEdildiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IadeEdildiComponent]
    });
    fixture = TestBed.createComponent(IadeEdildiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

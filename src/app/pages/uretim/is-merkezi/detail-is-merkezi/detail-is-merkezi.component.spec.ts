import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailIsMerkeziComponent } from './detail-is-merkezi.component';

describe('DetailIsMerkeziComponent', () => {
  let component: DetailIsMerkeziComponent;
  let fixture: ComponentFixture<DetailIsMerkeziComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailIsMerkeziComponent]
    });
    fixture = TestBed.createComponent(DetailIsMerkeziComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

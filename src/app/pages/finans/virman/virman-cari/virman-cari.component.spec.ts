import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirmanCariComponent } from './virman-cari.component';

describe('VirmanCariComponent', () => {
  let component: VirmanCariComponent;
  let fixture: ComponentFixture<VirmanCariComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VirmanCariComponent]
    });
    fixture = TestBed.createComponent(VirmanCariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

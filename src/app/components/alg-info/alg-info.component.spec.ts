import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgInfoComponent } from './alg-info.component';

describe('AlgInfoComponent', () => {
  let component: AlgInfoComponent;
  let fixture: ComponentFixture<AlgInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlgInfoComponent]
    });
    fixture = TestBed.createComponent(AlgInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

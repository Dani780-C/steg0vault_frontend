import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkInactiveComponent } from './mark-inactive.component';

describe('MarkInactiveComponent', () => {
  let component: MarkInactiveComponent;
  let fixture: ComponentFixture<MarkInactiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarkInactiveComponent]
    });
    fixture = TestBed.createComponent(MarkInactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

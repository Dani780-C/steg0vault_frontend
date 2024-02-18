import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtractKeyComponent } from './extract-key.component';

describe('ExtractKeyComponent', () => {
  let component: ExtractKeyComponent;
  let fixture: ComponentFixture<ExtractKeyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExtractKeyComponent]
    });
    fixture = TestBed.createComponent(ExtractKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

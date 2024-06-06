import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TryToExtractComponent } from './try-to-extract.component';

describe('TryToExtractComponent', () => {
  let component: TryToExtractComponent;
  let fixture: ComponentFixture<TryToExtractComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TryToExtractComponent]
    });
    fixture = TestBed.createComponent(TryToExtractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

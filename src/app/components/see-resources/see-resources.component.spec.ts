import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeResourcesComponent } from './see-resources.component';

describe('SeeResourcesComponent', () => {
  let component: SeeResourcesComponent;
  let fixture: ComponentFixture<SeeResourcesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeeResourcesComponent]
    });
    fixture = TestBed.createComponent(SeeResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

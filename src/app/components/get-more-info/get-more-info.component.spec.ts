import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetMoreInfoComponent } from './get-more-info.component';

describe('GetMoreInfoComponent', () => {
  let component: GetMoreInfoComponent;
  let fixture: ComponentFixture<GetMoreInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetMoreInfoComponent]
    });
    fixture = TestBed.createComponent(GetMoreInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

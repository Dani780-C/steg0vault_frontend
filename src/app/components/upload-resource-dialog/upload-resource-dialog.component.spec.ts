import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadResourceDialogComponent } from './upload-resource-dialog.component';

describe('UploadResourceDialogComponent', () => {
  let component: UploadResourceDialogComponent;
  let fixture: ComponentFixture<UploadResourceDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadResourceDialogComponent]
    });
    fixture = TestBed.createComponent(UploadResourceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

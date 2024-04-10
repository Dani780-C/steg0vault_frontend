import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCollectionPromptComponent } from './delete-collection-prompt.component';

describe('DeleteCollectionPromptComponent', () => {
  let component: DeleteCollectionPromptComponent;
  let fixture: ComponentFixture<DeleteCollectionPromptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteCollectionPromptComponent]
    });
    fixture = TestBed.createComponent(DeleteCollectionPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

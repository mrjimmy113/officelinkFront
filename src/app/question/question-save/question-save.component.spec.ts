import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionSaveComponent } from './question-save.component';

describe('QuestionSaveComponent', () => {
  let component: QuestionSaveComponent;
  let fixture: ComponentFixture<QuestionSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

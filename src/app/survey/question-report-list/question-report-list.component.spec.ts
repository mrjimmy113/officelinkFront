import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionReportListComponent } from './question-report-list.component';

describe('QuestionReportListComponent', () => {
  let component: QuestionReportListComponent;
  let fixture: ComponentFixture<QuestionReportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionReportListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

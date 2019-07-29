import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyHistoryDetailComponent } from './survey-history-detail.component';

describe('SurveyHistoryDetailComponent', () => {
  let component: SurveyHistoryDetailComponent;
  let fixture: ComponentFixture<SurveyHistoryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyHistoryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyHistoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

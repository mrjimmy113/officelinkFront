import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyHistoryMainComponent } from './survey-history-main.component';

describe('SurveyHistoryMainComponent', () => {
  let component: SurveyHistoryMainComponent;
  let fixture: ComponentFixture<SurveyHistoryMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyHistoryMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyHistoryMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

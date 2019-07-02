import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyCompareComponent } from './survey-compare.component';

describe('SurveyCompareComponent', () => {
  let component: SurveyCompareComponent;
  let fixture: ComponentFixture<SurveyCompareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyCompareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

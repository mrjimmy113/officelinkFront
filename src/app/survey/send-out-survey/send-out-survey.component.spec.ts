import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendOutSurveyComponent } from './send-out-survey.component';

describe('SendOutSurveyComponent', () => {
  let component: SendOutSurveyComponent;
  let fixture: ComponentFixture<SendOutSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendOutSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendOutSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

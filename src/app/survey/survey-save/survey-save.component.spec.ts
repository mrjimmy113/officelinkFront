import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveySaveComponent } from './survey-save.component';

describe('SurveySaveComponent', () => {
  let component: SurveySaveComponent;
  let fixture: ComponentFixture<SurveySaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveySaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveySaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

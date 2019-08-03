import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyFilterComponent } from './apply-filter.component';

describe('ApplyFilterComponent', () => {
  let component: ApplyFilterComponent;
  let fixture: ComponentFixture<ApplyFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

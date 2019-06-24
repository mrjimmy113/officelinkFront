import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkplaceSaveComponent } from './workplace-save.component';

describe('WorkplaceSaveComponent', () => {
  let component: WorkplaceSaveComponent;
  let fixture: ComponentFixture<WorkplaceSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkplaceSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkplaceSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordCloudSaveComponent } from './word-cloud-save.component';

describe('WordCloudSaveComponent', () => {
  let component: WordCloudSaveComponent;
  let fixture: ComponentFixture<WordCloudSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordCloudSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordCloudSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

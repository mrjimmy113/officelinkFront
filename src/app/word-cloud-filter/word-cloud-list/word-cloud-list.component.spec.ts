import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordCloudListComponent } from './word-cloud-list.component';

describe('WordCloudListComponent', () => {
  let component: WordCloudListComponent;
  let fixture: ComponentFixture<WordCloudListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordCloudListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordCloudListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

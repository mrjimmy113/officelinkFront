import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationSaveComponent } from './configuration-save.component';

describe('ConfigurationSaveComponent', () => {
  let component: ConfigurationSaveComponent;
  let fixture: ComponentFixture<ConfigurationSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurationSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

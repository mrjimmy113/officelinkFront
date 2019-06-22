import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSaveComponent } from './account-save.component';

describe('AccountSaveComponent', () => {
  let component: AccountSaveComponent;
  let fixture: ComponentFixture<AccountSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

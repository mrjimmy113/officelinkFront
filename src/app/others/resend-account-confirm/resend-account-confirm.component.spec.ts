import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResendAccountConfirmComponent } from './resend-account-confirm.component';

describe('ResendAccountConfirmComponent', () => {
  let component: ResendAccountConfirmComponent;
  let fixture: ComponentFixture<ResendAccountConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResendAccountConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResendAccountConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

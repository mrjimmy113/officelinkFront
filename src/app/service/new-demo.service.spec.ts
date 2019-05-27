import { TestBed } from '@angular/core/testing';

import { NewDemoService } from './new-demo.service';

describe('NewDemoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewDemoService = TestBed.get(NewDemoService);
    expect(service).toBeTruthy();
  });
});

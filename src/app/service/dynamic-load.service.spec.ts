import { TestBed } from '@angular/core/testing';

import { DynamicLoadService } from './dynamic-load.service';

describe('DynamicLoadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DynamicLoadService = TestBed.get(DynamicLoadService);
    expect(service).toBeTruthy();
  });
});

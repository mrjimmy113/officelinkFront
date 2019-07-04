import { TestBed } from '@angular/core/testing';

import { UltisService } from './ultis.service';

describe('UltisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UltisService = TestBed.get(UltisService);
    expect(service).toBeTruthy();
  });
});

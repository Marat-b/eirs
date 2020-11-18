import { TestBed } from '@angular/core/testing';

import { TimeIntervalService } from './time-interval.service';

describe('TimeIntervalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TimeIntervalService = TestBed.get(TimeIntervalService);
    expect(service).toBeTruthy();
  });
});

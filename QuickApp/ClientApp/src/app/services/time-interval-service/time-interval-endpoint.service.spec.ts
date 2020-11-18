import { TestBed } from '@angular/core/testing';

import { TimeIntervalEndpointService } from './time-interval-endpoint.service';

describe('TimeIntervalEndpointService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TimeIntervalEndpointService = TestBed.get(TimeIntervalEndpointService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { DeviceLinkPoolService } from './device-link-pool.service';

describe('DeviceLinkPoolService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeviceLinkPoolService = TestBed.get(DeviceLinkPoolService);
    expect(service).toBeTruthy();
  });
});

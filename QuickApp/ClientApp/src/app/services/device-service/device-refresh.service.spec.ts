import { TestBed } from '@angular/core/testing';

import { DeviceRefreshService } from './device-refresh.service';

describe('DeviceRefreshService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeviceRefreshService = TestBed.get(DeviceRefreshService);
    expect(service).toBeTruthy();
  });
});

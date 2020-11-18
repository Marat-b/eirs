import { TestBed } from '@angular/core/testing';

import { DeviceResolverService } from './device-resolver.service';

describe('DeviceResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeviceResolverService = TestBed.get(DeviceResolverService);
    expect(service).toBeTruthy();
  });
});

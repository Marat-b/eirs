import { TestBed } from '@angular/core/testing';

import { DeviceLinkPoolEndpointService } from './device-link-pool-endpoint.service';

describe('DeviceLinkPoolEndpointService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeviceLinkPoolEndpointService = TestBed.get(DeviceLinkPoolEndpointService);
    expect(service).toBeTruthy();
  });
});

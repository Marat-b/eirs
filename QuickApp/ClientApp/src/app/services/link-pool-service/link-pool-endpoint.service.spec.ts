import { TestBed } from '@angular/core/testing';

import { LinkPoolEndpointService } from './link-pool-endpoint.service';

describe('LinkPoolEndpointService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LinkPoolEndpointService = TestBed.get(LinkPoolEndpointService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { LinkPoolService } from './link-pool.service';

describe('LinkPoolService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LinkPoolService = TestBed.get(LinkPoolService);
    expect(service).toBeTruthy();
  });
});

import { Injectable } from '@angular/core';
import {LinkPoolEndpointService} from './link-pool-endpoint.service';
import {UrlPoolModel} from '../../models/link-pool.model';

@Injectable({
  providedIn: 'root'
})
export class LinkPoolService {

  constructor(private linkPoolEndpointService: LinkPoolEndpointService) { }

  getLinkPools() {
    return this.linkPoolEndpointService.getLinkPoolEndpoint<UrlPoolModel[]>();
  }

  getLinkPool(linkpoolId: number) {
    return this.linkPoolEndpointService.getLinkPoolEndpoint<UrlPoolModel>(linkpoolId);
  }

  newLinkPool(linkPoolObject: UrlPoolModel) {
    return this.linkPoolEndpointService.getNewLinkPoolEndpoint<UrlPoolModel>(linkPoolObject);
  }

  updateLinkPool(linkPoolObject: UrlPoolModel) {
    if (linkPoolObject) {
      return this.linkPoolEndpointService.getUpdateLinkPoolEndpoint(linkPoolObject.linkpoolId, linkPoolObject);
    }
  }

  deleteLinkPool(linkpoolId: number) {
    return this.linkPoolEndpointService.getDeleteLinkPoolEndpoint(linkpoolId);
  }
}

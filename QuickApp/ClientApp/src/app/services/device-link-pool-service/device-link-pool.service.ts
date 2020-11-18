import { Injectable } from '@angular/core';
import {DeviceLinkPoolEndpointService} from './device-link-pool-endpoint.service';
import {UrlPoolModel} from '../../models/link-pool.model';
import {DeviceUrlPoolModel} from '../../models/device-link-pool.model';
import {DeviceSelectedModel} from '../../models/device-selected.model';

@Injectable({
  providedIn: 'root'
})
export class DeviceLinkPoolService {

  constructor(private deviceLinkPoolEndpointService: DeviceLinkPoolEndpointService) { }

  updateDeviceLinkPool(linkPoolId: number, devicesId: DeviceSelectedModel) {
    console.log('updateDeviceLinkPool devicesId=' + JSON.stringify(devicesId));
    return this.deviceLinkPoolEndpointService.getUpdateDeviceLinkPoolEndpoint(devicesId, linkPoolId);
  }
}

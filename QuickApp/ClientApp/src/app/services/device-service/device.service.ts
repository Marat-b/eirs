import {Injectable} from '@angular/core';
import {DeviceEndpointService} from './device-endpoint.service';
import {DeviceModel} from '../../models/device.model';
import {DeviceUrlPoolModel} from '../../models/device-link-pool.model';
import {DeviceLPModel} from '../../models/device-lp.model';
import {forkJoin} from 'rxjs';
import {DeviceLinkPoolEndpointService} from '../device-link-pool-service/device-link-pool-endpoint.service';

@Injectable()
export class DeviceService {

  constructor(private deviceEndpointService: DeviceEndpointService,
              private deviceLinkPoolEndpointService: DeviceLinkPoolEndpointService) {}

  getDevices() {
    return this.deviceEndpointService.getDeviceEndpoint<DeviceModel[]>();
  }

  getDevice(deviceId: number) {
    return this.deviceEndpointService.getDeviceEndpoint<DeviceModel>(deviceId);
  }

  newDevice(deviceObject: DeviceModel) {
    return this.deviceEndpointService.getNewDeviceEndpoint<DeviceModel>(deviceObject);
  }

  updateDevice(deviceObject: DeviceModel) {
    if (deviceObject) {
      console.log('updateDevice deviceObject = ' + JSON.stringify(deviceObject));
      return this.deviceEndpointService.getUpdateDeviceEndpoint(deviceObject.id, deviceObject);
    }
  }

  deleteDevice(deviceId: number) {
    return this.deviceEndpointService.getDeleteDeviceEndpoint(deviceId);
  }

  getDeviceLinkPool(linkPoolId: number) {
    return forkJoin( this.deviceEndpointService.getDeviceLinkPoolEndpoint<DeviceLPModel[]>(linkPoolId),
      this.deviceLinkPoolEndpointService.getDeviceLinkPoolEndpoint<number[]>(linkPoolId)
    );
  }

}

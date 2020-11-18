import {Injectable, OnDestroy} from '@angular/core';
import {DeviceModel} from '../../models/device.model';
import {Subject, Subscription} from 'rxjs';
import {DeviceService} from './device.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceRefreshService implements OnDestroy {
  sub: Subscription;
  private onDevicesRefresh = new Subject<DeviceModel[]>();
  private onDeviceRefresh = new Subject<DeviceModel>();
  devicesRefresh$ = this.onDevicesRefresh.asObservable();
  deviceRefresh$ = this.onDeviceRefresh.asObservable();

  constructor(private deviceService: DeviceService) {
    this.sub = this.deviceService.getDevices().subscribe(
      results => { this.onDevicesRefresh.next(results); }
    );
  }

  public refreshDevices(devices: DeviceModel[]) {
    this.onDevicesRefresh.next(devices);
  }

  public refreshDevice(id: number) {
    this.deviceService.getDevice(id).subscribe(
      result => this.onDeviceRefresh.next(result)
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

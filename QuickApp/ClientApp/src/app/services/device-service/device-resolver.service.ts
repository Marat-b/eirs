import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {DeviceModel} from '../../models/device.model';
import {Observable} from 'rxjs';
import {DeviceService} from './device.service';
import {DeviceRefreshService} from './device-refresh.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceResolverService implements Resolve<DeviceModel> {
  ds: DeviceModel;
  constructor(private deviceService: DeviceService,
              private  deviceRefreshService: DeviceRefreshService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DeviceModel> | Promise<DeviceModel> | DeviceModel {
    const id: number = + route.paramMap.get('id');
    console.log('resolve id = ' + id);
/*
      this.deviceService.getDevice(id).subscribe(
      result => this.ds = result[0]
    );
    console.log('resolve ds = ' + JSON.stringify(this.ds));
    return this.ds;*/
    // this.deviceRefreshService.refreshDevice(id);
    return this.deviceService.getDevice(id);
  }
}

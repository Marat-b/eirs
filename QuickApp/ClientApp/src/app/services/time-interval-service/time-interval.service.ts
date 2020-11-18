import { Injectable } from '@angular/core';
import {TimeIntervalModel} from '../../models/time-interval.model';
import {TimeIntervalEndpointService} from './time-interval-endpoint.service';
import {DeviceModel} from '../../models/device.model';

@Injectable({
  providedIn: 'root'
})
export class TimeIntervalService {

  constructor(private  timeintervalEndpointService: TimeIntervalEndpointService) { }

  getTimeInterval() {
    console.log('getTimeIntervals');
    return this.timeintervalEndpointService.getTimeintervalEndpoint<TimeIntervalModel>();
  }

    updateTimeInterval(timeInterval: TimeIntervalModel): any {
    if (timeInterval) {
      console.log('updateTimeIntervals timeInterval = ' + JSON.stringify(timeInterval));
      return this.timeintervalEndpointService.getUpdateTimeintervalEndpoint(timeInterval);
    }
  }

}

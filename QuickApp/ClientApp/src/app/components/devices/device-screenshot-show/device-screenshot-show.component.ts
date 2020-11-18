import {Component,  Input} from '@angular/core';
import {DeviceModel} from '../../../models/device.model';

@Component({
  selector: 'app-device-screenshot-show',
  templateUrl: './device-screenshot-show.component.html',
  styleUrls: ['./device-screenshot-show.component.scss']
})
export class DeviceScreenshotShowComponent  {
  @Input() device = new DeviceModel();

  constructor() { }


}

import {Component, Inject, Input, OnInit} from '@angular/core';
import {DeviceModel} from '../../../models/device.model';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material';

@Component({
  selector: 'app-device-volume-sheet',
  templateUrl: './device-volume-sheet.component.html',
  styleUrls: ['./device-volume-sheet.component.scss']
})
export class DeviceVolumeSheetComponent {
  device: DeviceModel;

  constructor(public bottomSheetRef: MatBottomSheetRef<DeviceModel>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: {device: DeviceModel}) {
    this.device = this.data.device;
  }


}

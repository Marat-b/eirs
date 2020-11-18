import {Component, Inject, OnInit} from '@angular/core';
import {DeviceModel} from '../../../models/device.model';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material';

@Component({
  selector: 'app-device-view-sheet',
  templateUrl: './device-view-sheet.component.html',
  styleUrls: ['./device-view-sheet.component.scss']
})
export class DeviceViewSheetComponent  {
  viewDevice: DeviceModel;
  overTime: number;


  constructor(private bottomSheetRef: MatBottomSheetRef<DeviceModel>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: {device: DeviceModel, overTime: number}) {
    this.viewDevice = this.data.device;
    this.overTime = this.data.overTime;
  }

  cancel() {
    this.bottomSheetRef.dismiss();
  }

}
